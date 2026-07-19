import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {news.map((item) => (

            <div
              key={item.id}
              className="overflow-hidden rounded-xl border bg-white shadow-md"
            >

              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={400}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">

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
                  className="mt-5 inline-block rounded bg-blue-700 px-4 py-2 text-white"
                >
                  Baca Selengkapnya
                </Link>

              </div>

            </div>

          ))}

        </div>
      </section>

      <Footer />
    </>
  );
}