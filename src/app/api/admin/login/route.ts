import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("DATA DITERIMA:", body);

    const news = await prisma.news.create({
      data: {
        title: body.title,
        date: body.date,
        image: body.image,
        excerpt: body.excerpt,
        content: body.content,
      },
    });

    console.log("BERHASIL DISIMPAN:", news);

    return NextResponse.json(news);

  } catch (error: any) {
    console.error("ERROR PRISMA:");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}