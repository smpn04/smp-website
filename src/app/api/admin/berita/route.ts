import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Konfigurasi Cloudinary dari file .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

// POST: Tambah Berita Baru (Upload Foto Permanen ke Cloudinary)
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let title = "";
    let content = "";
    let excerpt = "";
    let date = "";
    let imageList: string[] = [];

    // Jika input berupa FormData (File Unggahan)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      title = (formData.get("title") as string) || "";
      content = (formData.get("content") as string) || "";
      excerpt = (formData.get("excerpt") as string) || "";
      date = (formData.get("date") as string) || "";

      const files = formData.getAll("images") as File[];
      const singleFile = formData.get("image") as File;

      const uploadFiles = files.length > 0 && files[0] instanceof File ? files : singleFile instanceof File ? [singleFile] : [];

      // Upload file ke Cloudinary
      for (const file of uploadFiles) {
        if (file && file.size > 0) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          // Upload buffer langsung ke Cloudinary
          const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { folder: "berita_sekolah" },
              (error, result) => {
                if (error || !result) reject(error);
                else resolve(result);
              }
            ).end(buffer);
          });

          // Ambil URL Cloudinary permanen (https://res.cloudinary.com/...)
          imageList.push(uploadResult.secure_url);
        }
      }
    } else {
      // Jika input berupa JSON biasa
      const body = await req.json();
      title = body.title || "";
      content = body.content || "";
      excerpt = body.excerpt || "";
      date = body.date || "";

      if (Array.isArray(body.images)) {
        imageList = body.images;
      } else if (body.image) {
        imageList = [body.image];
      }
    }

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Judul berita wajib diisi!" },
        { status: 400 }
      );
    }

    // @ts-ignore
    const newNews = await prisma.news.create({
      data: {
        title: title,
        content: content,
        excerpt: excerpt || content.slice(0, 150),
        date: date || new Date().toISOString().split("T")[0],
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