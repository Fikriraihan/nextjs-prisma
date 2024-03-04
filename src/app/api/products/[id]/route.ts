import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    const product = await prisma.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: `Product: ${product.name} deleted successfully` });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};
