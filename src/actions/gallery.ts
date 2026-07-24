"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

export async function createGallery(formData: FormData) {
  const title = formData.get("title")?.toString().trim() || "";
  const image = formData.get("image") as File;

  if (!title || !image || image.size === 0) {
    throw new Error("Judul dan gambar wajib diisi.");
  }

  const blob = await put(image.name, image, {
    access: "public",
  });

  await prisma.gallery.create({
    data: {
      title,
      image: blob.url,
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
    const blob = await put(image.name, image, {
      access: "public",
    });

    data.image = blob.url;
  }

  await prisma.gallery.update({
    where: { id },
    data,
  });

  redirect("/admin/gallery");
}

export async function deleteGallery(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.gallery.delete({
    where: { id },
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