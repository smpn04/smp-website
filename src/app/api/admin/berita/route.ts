import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // sesuaikan path ke prisma client kamu

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, date, excerpt, content, image, published } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Judul berita wajib diisi" },
        { status: 400 }
      );
    }

    // PANGGUL prisma.news (sesuai nama model di schema.prisma)
    const newNews = await prisma.news.create({
      data: {
        title,
        date: date || new Date().toISOString().split("T")[0],
        image: image || "", // Menyimpan string Base64 ke kolom @db.Text
        excerpt: excerpt || "",
        content: content || "",
        published: published ?? false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil disimpan",
      data: newNews,
    });
  } catch (error: any) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal menyimpan ke database" },
      { status: 500 }
    );
  }
}