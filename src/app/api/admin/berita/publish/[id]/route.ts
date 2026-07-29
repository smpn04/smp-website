import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const rawId = resolvedParams.id;

    if (!rawId) {
      return NextResponse.json(
        { success: false, message: "ID Berita tidak ditemukan dalam URL" },
        { status: 400 }
      );
    }

    // Coba konversi ke Number jika ID berupa integer, jika gagal gunakan string asal
    const numericId = Number(rawId);
    const targetId: any = !isNaN(numericId) ? numericId : rawId;

    let publishedStatus: boolean | undefined;
    try {
      const body = await req.json();
      if (typeof body.published === "boolean") {
        publishedStatus = body.published;
      }
    } catch (e) {
      // Body tidak ada atau bukan JSON
    }

    // Cari berita berdasarkan ID (mencoba angka dulu, jika gagal coba string)
    let currentNews = null;
    try {
      currentNews = await (prisma.news as any).findUnique({
        where: { id: targetId },
        select: { id: true, published: true },
      });
    } catch (err) {
      // Fallback jika ID bertipe String
      currentNews = await (prisma.news as any).findUnique({
        where: { id: String(rawId) },
        select: { id: true, published: true },
      });
    }

    if (!currentNews) {
      return NextResponse.json(
        { success: false, message: `Berita dengan ID '${rawId}' tidak ditemukan.` },
        { status: 404 }
      );
    }

    // Jika status tidak dikirim, toggle status yang ada
    const nextPublished =
      typeof publishedStatus === "boolean"
        ? publishedStatus
        : !currentNews.published;

    // Update status di database
    const updatedNews = await (prisma.news as any).update({
      where: { id: currentNews.id },
      data: {
        published: nextPublished,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedNews,
    });
  } catch (error: any) {
    console.error("ERROR PUBLISH BERITA DETAIL:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Terjadi kesalahan pada server",
        errorDetails: String(error),
      },
      { status: 500 }
    );
  }
}