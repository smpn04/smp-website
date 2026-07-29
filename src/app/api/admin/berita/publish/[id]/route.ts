import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const newsId = Number(id);

    if (!newsId || isNaN(newsId)) {
      return NextResponse.json(
        { success: false, message: "ID Berita tidak valid" },
        { status: 400 }
      );
    }

    // Ambil data request body
    let publishedStatus: boolean | undefined;
    try {
      const body = await req.json();
      publishedStatus = body.published;
    } catch {
      // Body kosong
    }

    // Jika status tidak dikirim, ambil status berita saat ini lalu toggle
    if (typeof publishedStatus !== "boolean") {
      const currentNews = await prisma.news.findUnique({
        where: { id: newsId },
        select: { published: true },
      });

      if (!currentNews) {
        return NextResponse.json(
          { success: false, message: "Berita tidak ditemukan di database" },
          { status: 404 }
        );
      }
      publishedStatus = !currentNews.published;
    }

    // 👈 DI SINI PERBAIKANNYA: Pakai prisma.news, BUKAN prisma.gallery
    const updatedNews = await prisma.news.update({
      where: { id: newsId },
      data: {
        published: publishedStatus,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedNews,
    });
  } catch (error: any) {
    console.error("ERROR PUBLISH BERITA:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal memperbarui status berita",
      },
      { status: 500 }
    );
  }
}