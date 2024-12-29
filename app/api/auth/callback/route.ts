'use server'
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

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

    // Store the access token in a cookie or session (if needed)
    // In this example, assume it's saved to cookies or session

    // Redirect the user to the dashboard
    return NextResponse.redirect(new URL('/dashboard', req.url)); // This will redirect to /dashboard

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch access token' }, { status: 500 });
  }
}
