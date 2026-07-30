import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, published } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID Berita wajib diisi!" },
        { status: 400 }
      );
    }

    // @ts-ignore
    const updatedNews = await prisma.news.update({
      where: { id: Number(id) },
      data: { published: Boolean(published) },
    });

    return NextResponse.json({ success: true, data: updatedNews });
  } catch (error: any) {
    console.error("ERROR TOGGLE NEWS:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Gagal mengubah status berita" },
      { status: 500 }
    );
  }
}