import { createGallery } from "@/actions/gallery";

export default function TambahGalleryPage() {
  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">
        Tambah Foto Galeri
      </h1>

      <form
        action={createGallery}
        className="max-w-xl space-y-5"
      >
        <div>
          <label className="mb-2 block">
            Judul Foto
          </label>

          <input
            type="text"
            name="title"
            required
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Foto
          </label>

          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="w-full rounded border p-3"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-blue-700 px-6 py-3 text-white"
        >
          Simpan
        </button>
      </form>
    </>
  );
}