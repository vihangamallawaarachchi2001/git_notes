'use server'
import { prisma } from "@/utils/prisma";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

type EmailDetail = {
  email: string;
  primary?: boolean; // Assuming 'primary' is optional
};

export async function GET(req: NextRequest) {
  const sessionCode = req.nextUrl.searchParams.get("code");

  if (!sessionCode) {
    return NextResponse.json(
      {
        error: "Code not provided",
      },
      {
        status: 400,
      }
    );
  }
  console.log(sessionCode)

  try {
    const result = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: sessionCode,
      },
      {
        headers: { Accept: 'application/json' },
      }
    );

    const { access_token } = result.data;

    console.log('acess token', access_token)

    if (!access_token) {
      return NextResponse.json(
        {
          error: 'Access token not found',
        },
        {
          status: 400,
        }
      );
    }

    const userDetails = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${access_token}`}
    });

    const emailDetails = await axios.get('https://api.github.com/user/emails',{
      headers: { Authorization: `bearer ${access_token}`}
    })
    let email = null;
    if ( emailDetails.data && emailDetails.data.length > 0) {
      email = emailDetails.data.find( (email: EmailDetail) => email.primary)?.email || emailDetails.data[0].email
    } else {
      return NextResponse.json({ message: 'no email' }, { status: 500 });
    }

    const { login, id, avatar_url } = userDetails.data;

    console.log('user details fetced from github',userDetails.data)

    const allUSer = await prisma.user.findMany();
    console.log('all users', allUSer)

    console.log('login: ', login, 'id : ', id, 'email : ', email, 'avatar_url : ', avatar_url);

    //it is not working from here above parts are working 
    const user = await prisma.user.upsert({
      where: {githubId: String(id) },
      update: {},
      create: {
        githubId: String(id),
        username: login,
        email: email,
        avatarUrl: avatar_url,
      }
    });

    if ( !user ){
      throw new Error('user is not upserted')
    }

    console.log('user saved in the database',user)

    let repository = await prisma.repository.findFirst({
      where: { userId: user.id}
    })

    console.log('user repositorires: ', repository)

    if ( !repository ) {
      const octokit = new Octokit({auth: access_token});

      const createRepoResponse = await octokit.rest.repos.createForAuthenticatedUser({
        name: `${login}_gitNotes`,
        description: 'Repository for Git_Notes app.',
        private: false,
      })

      const { name, id:githubRepoId, html_url } = createRepoResponse.data;

      const readmeContent = `# Welcome to ${login}_Git_Notes Repository
      
      this repository u=is used to store notes for the Git_Notes application.
      `;

      await octokit.rest.repos.createOrUpdateFileContents({
        owner: login,
        repo: name,
        path: 'README.md',
        message: 'Add README.md',
        content: Buffer.from(readmeContent).toString('base64'),
      })

      const reposId = githubRepoId.toString();

      repository = await prisma.repository.create({
        data: {
          name,
          userId: user.id,
          githubRepoId: reposId,
          url: html_url,
          readmeUrl: `${html_url}/blob/main/README.md`
        }
      })

    }

    await prisma.session.create({
      data: {
        userId: user.id,
        authToken: access_token,
      }
    });

    

    // Redirect the user to the dashboard
    return NextResponse.redirect(new URL(`/dashboard?id=${user.id}`, req.url)); // This will redirect to /dashboard

  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);  // Log the error message
      console.error(error.stack);   // Log the stack trace for better debugging
    } else {
      console.error("An unknown error occurred", error);
    }
    return NextResponse.json({ error: 'Failed to fetch access token' }, { status: 500 });
  }
}
