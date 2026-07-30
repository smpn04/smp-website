import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = Number(rawId);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID Berita tidak valid" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Murni update tabel News
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
    console.error("ERROR PUBLISH BERITA:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal mengubah status berita" },
      { status: 500 }
    );
  }
}