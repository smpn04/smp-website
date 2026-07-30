import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Handler untuk Update Status Publish (PATCH)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID Berita tidak valid" },
        { status: 400 }
      );
    }

    const body = await req.json();

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
      { success: false, message: error.message || "Gagal memperbarui berita" },
      { status: 500 }
    );
  }
}

// Handler untuk Hapus Berita (DELETE)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID Berita tidak valid" },
        { status: 400 }
      );
    }

    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dihapus",
    });
  } catch (error: any) {
    console.error("ERROR DELETE BERITA:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}