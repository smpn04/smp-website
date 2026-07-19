import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteGallery } from "@/actions/gallery";

export default async function AdminGalleryPage() {
  const galleries = await prisma.gallery.findMany({
    orderBy: {
      id: "desc",
    },
  });

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
              <th className="border p-3">No</th>
              <th className="border p-3">Judul</th>
              <th className="border p-3">Gambar</th>
              <th className="border p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {galleries.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="border p-5 text-center"
                >
                  Belum ada foto.
                </td>
              </tr>
            ) : (
              galleries.map((gallery, index) => (
                <tr key={gallery.id}>
                  <td className="border p-3 text-center">
                    {index + 1}
                  </td>

                  <td className="border p-3">
                    {gallery.title}
                  </td>

                  <td className="border p-3 text-center">
                    <Image
                      src={gallery.image}
                      alt={gallery.title}
                      width={120}
                      height={80}
                      className="mx-auto h-20 w-32 rounded-lg object-cover"
                    />
                  </td>

                  <td className="border p-3">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/admin/gallery/edit/${gallery.id}`}
                        className="rounded bg-blue-600 px-3 py-2 text-white"
                      >
                        Edit
                      </Link>

                      <form action={deleteGallery}>
                        <input
                          type="hidden"
                          name="id"
                          value={gallery.id}
                        />

                        <button
                          type="submit"
                          className="rounded bg-red-600 px-3 py-2 text-white"
                        >
                          Hapus
                        </button>
                      </form>
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