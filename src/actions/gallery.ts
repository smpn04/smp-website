"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

export async function createGallery(formData: FormData) {
  const title = formData.get("title")?.toString().trim() || "";
  const image = formData.get("image") as File;

  let imagePath = "/gallery/default.jpg";

  if (image && image.size > 0) {
    const blob = await put(image.name, image, {
      access: "public",
      addRandomSuffix: true,
    });

    imagePath = blob.url;
  }

  await prisma.gallery.create({
    data: {
      title,
      image: imagePath,
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
      addRandomSuffix: true,
    });

    data.image = blob.url;
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