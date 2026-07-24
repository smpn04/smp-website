import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const admin = await prisma.admin.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Username atau password salah",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    );
  }
}