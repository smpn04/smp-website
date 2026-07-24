"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export async function createGallery(formData: FormData) {
  const title = formData.get("title")?.toString().trim() || "";
  const image = formData.get("image") as File;

  if (!title || !image || image.size === 0) {
    throw new Error("Judul dan gambar wajib diisi.");
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${uuid()}-${image.name}`;

  await fs.writeFile(
    path.join(process.cwd(), "public", "gallery", fileName),
    buffer
  );

  const imagePath = `/gallery/${fileName}`;

  await prisma.gallery.create({
    data: {
      title,
      image: imagePath,
      published: false,
    },
  });

  redirect("/admin/gallery");
}

export async function updateGallery(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title")?.toString().trim() || "";
  const image = formData.get("image") as File;

  const data: {
    title: string;
    image?: string;
  } = {
    title,
  };

  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${uuid()}-${image.name}`;

    await fs.writeFile(
      path.join(process.cwd(), "public", "gallery", fileName),
      buffer
    );

    data.image = `/gallery/${fileName}`;
  }

  await prisma.gallery.update({
    where: {
      id,
    },
    data,
  });

  redirect("/admin/gallery");
}

export async function deleteGallery(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.gallery.delete({
    where: {
      id,
    },
  });

  redirect("/admin/gallery");
}

export async function publishGallery(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.gallery.update({
    where: { id },
    data: {
      published: true,
    },
  });

  redirect("/admin/gallery");
}

export async function unpublishGallery(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.gallery.update({
    where: { id },
    data: {
      published: false,
    },
  });

  redirect("/admin/gallery");
}