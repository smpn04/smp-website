import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminBeritaPage() {
  let news: any[] = [];

  try {
    news = await prisma.news.findMany({
      orderBy: {
        id: "desc",
      },
    });
  } catch (error) {
    console.error("Database belum tersedia:", error);
  }

  return (
    <>
      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div>
            <h1 className="text-5xl font-bold">
              Kelola Berita
            </h1>

            <p className="mt-4 text-lg text-blue-100">
              Daftar berita sekolah.
            </p>
          </div>

          <Link
            href="/admin/berita/tambah"
            className="rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-blue-900"
          >
            + Tambah Berita
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">No</th>
              <th className="border p-3">Judul</th>
              <th className="border p-3">Tanggal</th>
              <th className="border p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {news.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="border p-5 text-center text-gray-500"
                >
                  Belum ada berita.
                </td>
              </tr>
            ) : (
              news.map((item, index) => (
                <tr key={item.id}>
                  <td className="border p-3 text-center">
                    {index + 1}
                  </td>

                  <td className="border p-3">
                    {item.title}
                  </td>

                  <td className="border p-3">
                    {item.date}
                  </td>

                  <td className="border p-3">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/berita/edit/${item.id}`}
                        className="rounded bg-blue-600 px-3 py-2 text-white"
                      >
                        Edit
                      </Link>

                      <button
                        className="rounded bg-red-600 px-3 py-2 text-white"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}