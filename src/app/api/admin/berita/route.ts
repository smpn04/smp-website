import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validasi & pastikan field gambar tidak merusak Prisma jika terlalu besar / kosong
    let imageUrl = body.image || "";

    // Jika gambar kosong, beri gambar placeholder default agar Prisma tidak error
    if (!imageUrl || imageUrl.trim() === "") {
      imageUrl = "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=60";
    }

    const news = await prisma.news.create({
      data: {
        title: body.title || "Berita Tanpa Judul",
        date: String(body.date || new Date().toISOString().split("T")[0]),
        image: imageUrl,
        excerpt: String(body.excerpt || ""),
        content: String(body.content || ""),
        published: Boolean(body.published ?? false),
      },
    });

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error: any) {
    console.error("ERROR PRISMA UPLOAD:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal menyimpan berita",
      },
      {
        status: 500,
      }
    );
  }
}