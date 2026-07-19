import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateTeacher } from "@/actions/teacher";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditGuruPage({ params }: Props) {
  const { id } = await params;

  const guru = await prisma.teacher.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!guru) {
    notFound();
  }

  return (
    <>
      <h1 className="text-4xl font-bold">
        Edit Guru
      </h1>

      <form
        action={updateTeacher}
        className="mt-10 max-w-2xl space-y-6"
      >
        <input
          type="hidden"
          name="id"
          value={guru.id}
        />

        <div>
          <label className="mb-2 block font-medium">
            Nama Guru
          </label>

          <input
            type="text"
            name="name"
            defaultValue={guru.name}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Jabatan
          </label>

          <input
            type="text"
            name="position"
            defaultValue={guru.position}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Foto Baru (Opsional)
          </label>

          <input
            type="file"
            name="photo"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-6 py-3 text-white"
        >
          Simpan Perubahan
        </button>
      </form>
    </>
  );
}