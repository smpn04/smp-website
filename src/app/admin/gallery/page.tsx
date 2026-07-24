import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import DeleteButton from "./DeleteButton";
import PublishButton from "./PublishButton";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  let galleries: any[] = [];

  try {
    galleries = await prisma.gallery.findMany({
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
              Kelola Galeri
            </h1>

            <p className="mt-4 text-lg text-blue-100">
              Daftar foto kegiatan sekolah.
            </p>
          </div>

          <Link
            href="/admin/gallery/tambah"
            className="rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-blue-900"
          >
            + Tambah Foto
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-center w-16">No</th>
              <th className="border p-3 text-center w-32">Foto</th>
              <th className="border p-3">Judul</th>
              <th className="border p-3 w-36">Status</th>
              <th className="border p-3 w-72">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {galleries.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="border p-5 text-center text-gray-500"
                >
                  Belum ada foto.
                </td>
              </tr>
            ) : (
              galleries.map((item, index) => (
                <tr key={item.id}>
                  <td className="border p-3 text-center">
                    {index + 1}
                  </td>

                  <td className="border p-3 text-center">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={70}
                        className="mx-auto rounded object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">
                        Tidak ada gambar
                      </span>
                    )}
                  </td>

                  <td className="border p-3">
                    {item.title}
                  </td>

                  <td className="border p-3 text-center">
                    {item.published ? (
                      <span className="rounded bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        🟢 Publish
                      </span>
                    ) : (
                      <span className="rounded bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                        🟡 Draft
                      </span>
                    )}
                  </td>

                  <td className="border p-3">
                    <div className="flex flex-wrap gap-2">

                      <PublishButton
                        id={item.id}
                        published={item.published}
                      />

                      <Link
                        href={`/admin/gallery/edit/${item.id}`}
                        className="rounded bg-blue-600 px-3 py-2 text-white"
                      >
                        Edit
                      </Link>

                      <DeleteButton id={item.id} />

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