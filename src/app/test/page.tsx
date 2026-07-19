import { prisma } from "@/lib/prisma";

export default async function TestPage() {
  const berita = await prisma.news.findMany();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Tes Database
      </h1>

      <p className="mt-4">
        Jumlah berita di database:
      </p>

      <h2 className="mt-2 text-5xl font-bold text-blue-700">
        {berita.length}
      </h2>
    </div>
  );
}