import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Route handler untuk update status berita (PATCH)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const rawId = resolvedParams.id;
    const id = Number(rawId);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID Berita harus berupa angka" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // UPDATE MODEL NEWS (BERITA)
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

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