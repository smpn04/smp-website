import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "File tidak ditemukan.",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name);
    const filename = `${randomUUID()}${ext}`;

    // Folder khusus berita
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "berita"
    );

    // Pastikan folder ada
    await mkdir(uploadDir, {
      recursive: true,
    });

    await writeFile(
      path.join(uploadDir, filename),
      buffer
    );

    return NextResponse.json({
      success: true,
      filename: `/uploads/berita/${filename}`,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload gagal.",
      },
      {
        status: 500,
      }
    );
  }
}