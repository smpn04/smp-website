import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    const teacher = await prisma.teacher.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!teacher) {
      return NextResponse.json(
        {
          success: false,
          message: "Data guru tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: teacher,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data guru.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: Props
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const teacher = await prisma.teacher.update({
      where: {
        id: Number(id),
      },
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

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengubah data guru.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: Props
) {
  try {
    const { id } = await params;

    await prisma.teacher.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus guru.",
      },
      {
        status: 500,
      }
    );
  }
}