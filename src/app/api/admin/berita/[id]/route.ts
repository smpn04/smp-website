import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Handler PATCH untuk update status Published/Draft
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedNews = await prisma.news.update({
      where: { id: Number(id) },
      data: {
        published: Boolean(body.published),
      },
    });

    return NextResponse.json({ success: true, data: updatedNews });
  } catch (error: any) {
    console.error("PATCH ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Handler DELETE untuk hapus berita
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.news.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: "Berita berhasil dihapus" });
  } catch (error: any) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}