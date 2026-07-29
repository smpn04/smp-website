import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File tidak ditemukan." },
        { status: 400 }
      );
    }

    // Ambil ekstensi & bersihkan nama file
    const ext = file.name.split(".").pop() || "jpg";
    const cleanName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "-");

    const filename = `berita/${Date.now()}-${cleanName}.${ext}`;

    // Oper token secara eksplisit agar aman di localhost maupun production
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN, // 👈 TAMBAHAN WAJIB
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
    });
  } catch (error: any) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Upload gagal. Pastikan Storage Vercel Blob sudah terhubung." 
      },
      { status: 500 }
    );
  }
}