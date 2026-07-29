import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    // PANGGIL prisma.news (Menyimpan URL resmi dari Vercel Blob)
    const newNews = await prisma.news.create({
      data: {
        title,
        date: date || new Date().toISOString().split("T")[0],
        image: image || null, // 👈 Simpan URL Vercel Blob (bukan Base64)
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