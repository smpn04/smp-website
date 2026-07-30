import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Route handler untuk update status berita (PATCH)
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await context.params;
    const id = Number(rawId);

    if (!id || isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID Berita tidak valid / harus berupa angka" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Pastikan memanggil prisma.news
    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        published: Boolean(body.published),
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedNews,
    });
  } catch (error: any) {
    console.error("ERROR PATCH BERITA:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal memperbarui status" },
      { status: 500 }
    );
  }
}

// Route handler untuk hapus berita (DELETE)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await context.params;
    const id = Number(rawId);

    if (!id || isNaN(id)) {
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
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}