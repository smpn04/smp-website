import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const news = await prisma.news.create({
      data: {
        title: body.title || "",
        // Karena di schema.prisma tipe 'date' adalah String,
        // pastikan nilainya berupa String biasa (misal: "2026-07-18")
        date: String(body.date || ""), 
        image: String(body.image || ""),
        excerpt: String(body.excerpt || ""),
        content: String(body.content || ""),
        published: Boolean(body.published ?? false),
      },
    });

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error: any) {
    console.error("ERROR PRISMA:", error);

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