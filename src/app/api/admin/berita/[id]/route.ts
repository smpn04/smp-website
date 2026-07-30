import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = isNaN(Number(rawId)) ? rawId : Number(rawId);

    const body = await req.json();

    // Jalankan update ke tabel news
    const updatedNews = await (prisma as any).news.update({
      where: { id },
      data: {
        published: Boolean(body.published),
      },
    });

    return NextResponse.json({ success: true, data: updatedNews });
  } catch (error: any) {
    console.error("ERROR UPDATE BERITA:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Gagal mengupdate berita di database",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = isNaN(Number(rawId)) ? rawId : Number(rawId);

    await (prisma as any).news.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Berita berhasil dihapus" });
  } catch (error: any) {
    console.error("ERROR DELETE BERITA:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}