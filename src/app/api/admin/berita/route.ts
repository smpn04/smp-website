import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const news = await prisma.news.create({
      data: {
        title: body.title,
        // PERBAIKAN: Ubah string tanggal menjadi objek Date
        date: body.date ? new Date(body.date) : new Date(),
        image: body.image || null,
        excerpt: body.excerpt || null,
        content: body.content || null,
        published: false, // Selalu simpan sebagai Draft
      },
    });

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error: any) {
    console.error("ERROR:", error);

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