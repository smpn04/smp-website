import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import DeleteButton from "./DeleteButton";

export default async function AdminGuruPage() {
  const teachers = await prisma.teacher.findMany({
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
              Kelola Guru
            </h1>

            <p className="mt-4 text-lg text-blue-100">
              Daftar guru UPT SMP Negeri 4 Duampanua.
            </p>
          </div>

          <Link
            href="/admin/guru/tambah"
            className="rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-blue-900"
          >
            + Tambah Guru
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 w-16">No</th>
              <th className="border p-3 w-28">Foto</th>
              <th className="border p-3">Nama</th>
              <th className="border p-3">Jabatan</th>
              <th className="border p-3 w-56">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="border p-5 text-center text-gray-500"
                >
                  Belum ada data guru.
                </td>
              </tr>
            ) : (
              teachers.map((guru, index) => (
                <tr key={guru.id}>
                  <td className="border p-3 text-center">
                    {index + 1}
                  </td>

                  <td className="border p-3 text-center">
                    <Image
                      src={guru.photo || "/guru/default.jpg"}
                      alt={guru.name}
                      width={70}
                      height={70}
                      className="mx-auto rounded-full object-cover"
                    />
                  </td>

                  <td className="border p-3">
                    {guru.name}
                  </td>

                  <td className="border p-3">
                    {guru.position}
                  </td>

                  <td className="border p-3">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/guru/edit/${guru.id}`}
                        className="rounded bg-blue-600 px-3 py-2 text-white"
                      >
                        Edit
                      </Link>

                      <DeleteButton id={guru.id} />
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