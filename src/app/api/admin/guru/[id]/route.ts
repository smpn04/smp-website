import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// DELETE Guru berdasarkan ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await prisma.teacher.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus data guru" },
      { status: 500 }
    );
  }
}