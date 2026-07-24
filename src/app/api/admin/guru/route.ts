import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const teacher = await prisma.teacher.create({
      data: {
        name: body.name,
        position: body.position,
        photo: body.photo,
      },
    });

    return NextResponse.json({
      success: true,
      data: teacher,
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