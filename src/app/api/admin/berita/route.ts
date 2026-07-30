import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET: Ambil semua daftar berita
export async function GET() {
  try {
    const newsList = await (prisma as any).news.findMany({
      orderBy: {
        createdAt: "desc", // Mengurutkan dari berita terbaru
      },
    });

    return NextResponse.json({ success: true, data: newsList });
  } catch (error: any) {
    console.error("ERROR GET BERITA:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Gagal mengambil data berita" },
      { status: 500 }
    );
  }
}

// POST: Tambah Berita Baru (Dukungan Multiple Gambar)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json(
        { success: false, message: "Judul berita wajib diisi!" },
        { status: 400 }
      );
    }

    // Pastikan images dalam bentuk Array
    let imageList: string[] = [];
    if (Array.isArray(body.images)) {
      imageList = body.images;
    } else if (body.image) {
      // Jika dari form lama hanya mengirim 1 string gambar
      imageList = [body.image];
    }

    const newNews = await (prisma as any).news.create({
      data: {
        title: body.title,
        content: body.content || "",
        excerpt: body.excerpt || body.content?.slice(0, 150) || "",
        date: body.date || new Date().toISOString().split("T")[0],
        images: imageList, // Mengirimkan Array of String URL Foto
        published: true, // AUTO PUBLISH SECARA OTOMATIS!
      },
    });

    return NextResponse.json({ success: true, data: newNews }, { status: 201 });
  } catch (error: any) {
    console.error("ERROR POST BERITA:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Gagal menambah berita" },
      { status: 500 }
    );
  }
}