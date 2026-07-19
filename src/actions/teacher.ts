"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

export async function createTeacher(formData: FormData) {
  const name = formData.get("name")?.toString().trim() || "";
  const position = formData.get("position")?.toString().trim() || "";
  const photo = formData.get("photo") as File;

  let photoPath = "/guru/default.jpg";

  if (photo && photo.size > 0) {
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${uuid()}-${photo.name}`;

    await fs.writeFile(
      path.join(process.cwd(), "public", "guru", fileName),
      buffer
    );

    photoPath = `/guru/${fileName}`;
  }

  await prisma.teacher.create({
    data: {
      name,
      position,
      photo: photoPath,
    },
  });

  redirect("/admin/guru");
}

export async function updateTeacher(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = formData.get("name")?.toString().trim() || "";
  const position = formData.get("position")?.toString().trim() || "";
  const photo = formData.get("photo") as File;

  let data: {
    name: string;
    position: string;
    photo?: string;
  } = {
    name,
    position,
  };

  if (photo && photo.size > 0) {
    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${uuid()}-${photo.name}`;

    await fs.writeFile(
      path.join(process.cwd(), "public", "guru", fileName),
      buffer
    );

    data.photo = `/guru/${fileName}`;
  }

  await prisma.teacher.update({
    where: {
      id,
    },
    data,
  });

  redirect("/admin/guru");
}

export async function deleteTeacher(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.teacher.delete({
    where: {
      id,
    },
  });

  redirect("/admin/guru");
}