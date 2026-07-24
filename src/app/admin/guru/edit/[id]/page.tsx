"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditGuruPage({ params }: Props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [photo, setPhoto] = useState("");

  async function uploadPhoto(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const hasil = await res.json();

    if (!hasil.success) {
      throw new Error("Upload gagal");
    }

    return hasil.url;
  }

  async function simpanPerubahan(e: React.FormEvent) {
    e.preventDefault();

    const { id } = await params;

    try {
      let photoUrl = photo;

      const fileInput = document.getElementById(
        "photo"
      ) as HTMLInputElement;

      if (fileInput.files && fileInput.files.length > 0) {
        photoUrl = await uploadPhoto(fileInput.files[0]);
      }

      const res = await fetch(`/api/admin/guru/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          position,
          photo: photoUrl,
        }),
      });

      const hasil = await res.json();

      if (!hasil.success) {
        alert("Gagal mengubah guru");
        return;
      }

      alert("Data guru berhasil diperbarui.");

      router.push("/admin/guru");
      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Guru
      </h1>

      <form
        onSubmit={simpanPerubahan}
        className="space-y-5"
      >
        <input
          type="text"
          placeholder="Nama Guru"
          className="w-full rounded border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Jabatan"
          className="w-full rounded border p-3"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <input
          id="photo"
          type="file"
          className="w-full rounded border p-3"
          accept="image/*"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-blue-700 px-6 py-3 text-white"
          >
            Simpan Perubahan
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/guru")}
            className="rounded bg-gray-500 px-6 py-3 text-white"
          >
            Kembali
          </button>
        </div>
      </form>
    </main>
  );
}