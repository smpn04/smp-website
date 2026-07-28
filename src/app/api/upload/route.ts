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

    // Ambil ekstensi & buat nama file aman
    const ext = file.name.split(".").pop() || "jpg";
    const cleanName = file.name
      .replace(/\.[^/.]+$/, "") // hapus ekstensi lama
      .replace(/[^a-zA-Z0-9]/g, "-"); // bersihkan karakter aneh/spasi

    // Buat path unik dengan Timestamp
    const pathname = `berita/${Date.now()}-${cleanName}.${ext}`;

    // Jalankan Vercel Blob PUT tanpa bentrokan opsi
    const blob = await put(pathname, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: true, // Vercel akan otomatis menambahkan akhiran unik
    });

    console.log("UPLOAD SUCCESS:", blob.url);

    return NextResponse.json({
      success: true,
      url: blob.url,
    });
  } catch (error: any) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload gagal." },
      { status: 500 }
    );
  }
}