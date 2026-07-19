import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BeritaPage() {
  const news = await prisma.news.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <>
      <Header />

      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Berita Sekolah
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            Informasi dan kegiatan terbaru UPT SMP Negeri 4 Duampanua.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="space-y-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border bg-white p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold">
                {item.title}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {item.date}
              </p>

              <p className="mt-4 text-gray-600">
                {item.excerpt}
              </p>

              <Link
                href={`/berita/${item.id}`}
                className="mt-4 inline-block font-semibold text-blue-700"
              >
                Baca Selengkapnya →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}