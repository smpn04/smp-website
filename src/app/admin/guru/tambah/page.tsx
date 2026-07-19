import { createTeacher } from "@/actions/teacher";

export default function TambahGuruPage() {
  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">
        Tambah Guru
      </h1>

      <form
        action={createTeacher}
        className="max-w-xl space-y-5"
      >
        <div>
          <label className="mb-2 block">
            Nama Guru
          </label>

          <input
            type="text"
            name="name"
            required
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Jabatan
          </label>

          <input
            type="text"
            name="position"
            required
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Foto Guru
          </label>

          <input
            type="file"
            name="photo"
            accept="image/*"
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