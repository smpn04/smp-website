import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Pastikan tanggal dikonversi ke ISO-8601 DateTime yang valid
    let formattedDate: Date;
    if (body.date) {
      const parsedDate = new Date(body.date);
      // Validasi apakah parsedDate adalah tanggal yang valid
      formattedDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    } else {
      formattedDate = new Date();
    }

    const news = await prisma.news.create({
      data: {
        title: body.title,
        date: formattedDate.toISOString(), // Mengirim format ISO string standar
        image: body.image || null,
        excerpt: body.excerpt || null,
        content: body.content || null,
        published: false,
      },
    });

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error: any) {
    console.error("ERROR PRISMA:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal menyimpan berita",
      },
      {
        status: 500,
      }
    );
  }
}