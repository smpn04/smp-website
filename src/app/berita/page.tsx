import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Force Next.js agar selalu mengambil data berita paling baru dari database
export const revalidate = 0;

export default async function BeritaPage() {
  // Ambil semua berita tanpa menyaring published: true
  const news = await (prisma as any).news.findMany({
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
        {news.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center shadow-md">
            <h2 className="text-2xl font-semibold">
              Belum ada berita yang dipublikasikan
            </h2>

            <p className="mt-2 text-gray-500">
              Silakan kembali lagi nanti.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {news.map((item: any) => (
              <div
                key={item.id}
                className="rounded-xl border bg-white p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {item.date ? new Date(item.date).toLocaleDateString("id-ID") : "-"}
                </p>

                <p className="mt-4 text-gray-600">
                  {item.excerpt || item.content || ""}
                </p>

                <Link
                  href={`/berita/${item.id}`}
                  className="mt-4 inline-block font-semibold text-blue-700 hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}