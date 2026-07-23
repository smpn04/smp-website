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

    const news = await prisma.news.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!news) {
      return NextResponse.json(
        {
          success: false,
          message: "Berita tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: news,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data berita.",
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

    const news = await prisma.news.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        date: body.date,
        image: body.image,
        excerpt: body.excerpt,
        content: body.content,
      },
    });

    return NextResponse.json({
      success: true,
      data: news,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengubah berita.",
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

    await prisma.news.delete({
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
        message: "Gagal menghapus berita.",
      },
      {
        status: 500,
      }
    );
  }
}