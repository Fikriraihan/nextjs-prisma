import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, description, email } = body;

    const data = await prisma.post.create({
      data: {
        title,
        description,
        author: {
          connect: {
            email,
          },
        },
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Post Error", error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const data = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  return NextResponse.json(data);
}
