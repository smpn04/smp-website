import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const news = await prisma.news.create({
      data: {
        title: body.title,
        date: body.date,
        image: body.image,
        excerpt: body.excerpt,
        content: body.content,
        published: false, // Selalu simpan sebagai Draft
      },
    });

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error: any) {
    console.error("ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}