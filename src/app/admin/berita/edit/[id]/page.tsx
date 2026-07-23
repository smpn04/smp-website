import { prisma } from "@/lib/prisma";
import EditBeritaForm from "./EditBeritaForm";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPage({ params }: Props) {
  const { id } = await params;

  const berita = await prisma.news.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!berita) {
    notFound();
  }

  return <EditBeritaForm berita={berita} />;
}