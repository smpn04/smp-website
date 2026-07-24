import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateGallery } from "@/actions/gallery";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditGalleryPage({ params }: Props) {
  const { id } = await params;

  const gallery = await prisma.gallery.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!gallery) {
    notFound();
  }

  return (
    <>
      <h1 className="text-4xl font-bold">
        Edit Galeri
      </h1>

      <form
        action={updateGallery}
        className="mt-10 max-w-2xl space-y-6"
      >
        <input
          type="hidden"
          name="id"
          value={gallery.id}
        />

        <div>
          <label className="mb-2 block font-medium">
            Judul Foto
          </label>

          <input
            type="text"
            name="title"
            defaultValue={gallery.title}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Foto Baru (Opsional)
          </label>

          <input
            type="file"
            name="image"
            accept="image/*"
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