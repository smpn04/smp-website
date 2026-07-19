"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export async function createNews(formData: FormData) {
  const title = formData.get("title")?.toString().trim() || "";
  const date = formData.get("date")?.toString() || "";
  const content = formData.get("content")?.toString().trim() || "";
  const image = formData.get("image") as File;

  if (!title || !date || !content || !image || image.size === 0) {
    throw new Error("Semua data wajib diisi");
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
const fileName = `${uuid()}-${image.name}`;
const filePath = path.join(
  process.cwd(),
  "public",
  "uploads",
  "news",
  fileName
);
await fs.writeFile(filePath, buffer);
  await prisma.news.create({
    data: {
      title,
      date,
     image: `/uploads/news/${fileName}`,
      excerpt: content.substring(0, 100),
      content,
    },
  });

  redirect("/berita");
}