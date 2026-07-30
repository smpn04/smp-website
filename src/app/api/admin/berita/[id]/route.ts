import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    
    // Coba konversi ID ke number, tapi jika string tetap simpan
    const id = isNaN(Number(rawId)) ? rawId : Number(rawId);

    const body = await req.json();

    // Lakukan update ke tabel news
    const updatedNews = await (prisma as any).news.update({
      where: { id },
      data: {
        published: Boolean(body.published),
      },
    });

    return NextResponse.json({ success: true, data: updatedNews });
  } catch (error: any) {
    console.error("DEBUG ERROR PATCH BERITA:", error);

    // Mengirimkan detail error yang sangat spesifik ke frontend
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Gagal mengupdate berita",
        code: error?.code || "UNKNOWN_ERROR",
        meta: error?.meta || null,
      },
      { status: 500 }
    );
  }
}