"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export async function createGallery(formData: FormData) {
  const title = formData.get("title")?.toString().trim() || "";
  const image = formData.get("image") as File;

  let imagePath = "/gallery/default.jpg";

  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${uuid()}-${image.name}`;

    await fs.writeFile(
      path.join(process.cwd(), "public", "gallery", fileName),
      buffer
    );

    imagePath = `/gallery/${fileName}`;
  }

  await prisma.gallery.create({
    data: {
      title,
      image: imagePath,
    },
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