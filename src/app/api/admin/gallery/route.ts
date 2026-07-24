import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const gallery = await prisma.gallery.create({
      data: {
        title: body.title,
        image: body.image,
      },
    });

    return NextResponse.json({
      success: true,
      data: gallery,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}