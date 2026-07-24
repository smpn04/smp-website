import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  req: Request,
  { params }: Props
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const gallery = await prisma.gallery.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        image: body.image,
      },
    });

    return NextResponse.json({
      success: true,
      data: gallery,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengubah data galeri.",
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

    await prisma.gallery.delete({
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
        message: "Gagal menghapus foto.",
      },
      {
        status: 500,
      }
    );
  }
}