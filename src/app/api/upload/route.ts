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

    // 🎯 CARA AMPUH: Buat nama file unik memakai Date.now()
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const blob = await put(filename, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: true,
      allowOverwrite: true, // 👈 TAMBAHKAN BARIS INI
    });

    console.log("UPLOAD BERHASIL:", blob.url);

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