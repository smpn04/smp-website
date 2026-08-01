import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

// GET Data Semua Guru
export async function GET() {
  try {
    const guru = await prisma.teacher.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json({ success: true, data: guru });
  } catch (error) {
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

// POST Tambah Guru Baru + Foto Ke Cloudinary
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const file = formData.get("photo") as File;

    let photoUrl = "";

    if (file && file instanceof File && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "guru_sekolah" },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
      photoUrl = uploadResult.secure_url;
    }

    const newGuru = await prisma.teacher.create({
      data: {
        name,
        position,
        photo: photoUrl || null,
      },
    });

    return NextResponse.json({ success: true, data: newGuru });
  } catch (error) {
    const err = error instanceof Error ? error.message : "Gagal menambah data guru";
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
}