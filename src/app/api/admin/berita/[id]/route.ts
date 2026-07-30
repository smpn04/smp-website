import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// DELETE BERITA
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);

    if (isNaN(id) || !id) {
      return NextResponse.json(
        { success: false, message: "ID Berita tidak valid" },
        { status: 400 }
      );
    }

    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Berita berhasil dihapus" });
  } catch (error: any) {
    console.error("ERROR DELETE BERITA:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}

// TOGGLE PUBLISH / UPDATE BERITA
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);

    if (isNaN(id) || !id) {
      return NextResponse.json(
        { success: false, message: "ID Berita tidak valid" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Murni update tabel news
    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        published: Boolean(body.published),
      },
    });

    return NextResponse.json({ success: true, data: updatedNews });
  } catch (error: any) {
    console.error("ERROR UPDATE BERITA:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal mengupdate berita" },
      { status: 500 }
    );
  }
}