import { prisma } from "@/utils/prisma";
import type { NextApiRequest } from 'next'
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, { params }: { params: { userId: string } }) {

  try {
    const {userId} = await params;

    if (!userId) {
      return NextResponse.json({ message: "No userId found" }, { status: 400 });
    }

    // Ensure `userId` type matches your database (string vs. number)
    const user = await prisma.user.findFirst({
      where: { id: Number(userId) }, // If `id` is a string, no need to convert
    });

    if (!user) {
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }


    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
