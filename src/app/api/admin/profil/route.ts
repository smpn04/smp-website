import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

// GET Data Profil
export async function GET() {
  try {
    // @ts-ignore
    const profil = await prisma.profilSekolah.findFirst();
    return NextResponse.json({ success: true, data: profil });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, data: null });
  }
}

// POST / PUT Update Profil
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const kepalaSekolah = (formData.get("kepalaSekolah") as string) || "";
    const sambutan = (formData.get("sambutan") as string) || "";
    const jumlahSiswa = (formData.get("jumlahSiswa") as string) || "";
    const jumlahGuru = (formData.get("jumlahGuru") as string) || "";
    const jumlahKelas = (formData.get("jumlahKelas") as string) || "";
    const jumlahPrestasi = (formData.get("jumlahPrestasi") as string) || "";
    const file = formData.get("fotoKepsek") as File;

    let fotoUrl = (formData.get("existingFoto") as string) || "";

    // Upload foto ke Cloudinary jika ada file baru
    if (file && file instanceof File && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "profil_sekolah" },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
      fotoUrl = uploadResult.secure_url;
    }

    // @ts-ignore
    const existing = await prisma.profilSekolah.findFirst();

    let result;
    if (existing) {
      // @ts-ignore
      result = await prisma.profilSekolah.update({
        where: { id: existing.id },
        data: {
          kepalaSekolah,
          sambutan,
          jumlahSiswa,
          jumlahGuru,
          jumlahKelas,
          jumlahPrestasi,
          fotoKepsek: fotoUrl,
        },
      });
    } else {
      // @ts-ignore
      result = await prisma.profilSekolah.create({
        data: {
          kepalaSekolah,
          sambutan,
          jumlahSiswa,
          jumlahGuru,
          jumlahKelas,
          jumlahPrestasi,
          fotoKepsek: fotoUrl,
        },
      });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : "Gagal simpan profil";
    return NextResponse.json({ success: false, message: err }, { status: 500 });
  }
}