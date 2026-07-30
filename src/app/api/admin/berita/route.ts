import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET: Ambil semua daftar berita
export async function GET() {
  try {
    // @ts-ignore
    const newsList = await prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      { success: true, data: newsList },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Gagal mengambil data berita";
    console.error("ERROR GET BERITA:", error);
    return NextResponse.json(
      { success: false, message: errMessage },
      { status: 500 }
    );
  }
}

// POST: Tambah Berita Baru
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json(
        { success: false, message: "Judul berita wajib diisi!" },
        { status: 400 }
      );
    }

    let imageList: string[] = [];
    if (Array.isArray(body.images)) {
      imageList = body.images;
    } else if (body.image) {
      imageList = [body.image];
    }

    // @ts-ignore
    const newNews = await prisma.news.create({
      data: {
        title: body.title,
        content: body.content || "",
        excerpt: body.excerpt || body.content?.slice(0, 150) || "",
        date: body.date || new Date().toISOString().split("T")[0],
        images: imageList,
        published: true,
      },
    });

    return NextResponse.json({ success: true, data: newNews }, { status: 201 });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Gagal menambah berita";
    console.error("ERROR POST BERITA:", error);
    return NextResponse.json(
      { success: false, message: errMessage },
      { status: 500 }
    );
  }
}