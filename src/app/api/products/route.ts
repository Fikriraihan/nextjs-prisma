import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const keyword = new URL(req.url!).searchParams.get("keyword");
  let pageIndex: number = parseInt(new URL(req.url!).searchParams.get("page") || "1", 10);
  const pageSize = parseInt(new URL(req.url!).searchParams.get("size") || "6", 10); // Changed variable name to pageSize

  const data = await prisma.product.findMany({
    skip: (pageIndex - 1) * pageSize,
    take: pageSize,
    orderBy: {
      name: "asc",
    },
    where: {
      OR: [
        {
          name: {
            contains: keyword || "",
            mode: "insensitive",
          },
        },
      ],
    },
  });

  const count = await prisma.product.count();

  return NextResponse.json({ pageIndex, pageSize, totalPages: Math.ceil(count / pageSize), data });
}

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { name, brand, price, category, image, description } = body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        brand,
        price,
        category,
        image,
        description,
      },
    });

    return NextResponse.json(newProduct);
  } catch (err) {
    return NextResponse.json({ message: "Post Error", err }, { status: 500 });
  }
};
