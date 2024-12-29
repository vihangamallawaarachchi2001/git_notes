import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const { userId } = await params;

    // Check if userId is present
    if (!userId) {
      return NextResponse.json({ message: "no userid found" }, { status: 400 });
    }

    // Convert userId to a number
    const userIdNumber = Number(userId);
    
    if (isNaN(userIdNumber)) {
      return NextResponse.json({ message: "invalid userId format" }, { status: 400 });
    }

    // Find the repository associated with the user
    const userRepo = await prisma.repository.findFirst({
      where: { userId: userIdNumber },
    });

    // If no repository is found, return a 404 error
    if (!userRepo) {
      return NextResponse.json({ message: "repo not found" }, { status: 404 });
    }

    // Find the files associated with the repository
    const repoFiles = await prisma.file.findMany({
      where: { repositoryId: userRepo.id },
    });

    // If no files are found, return a 200 with an empty array
    if (repoFiles.length === 0) {

      return NextResponse.json({ message: "no files found" }, { status: 200 });
    }

    // Return the files as a response
    return NextResponse.json(repoFiles);

  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
}
