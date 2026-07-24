"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahGuruPage() {
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
      throw new Error("Upload foto gagal.");
    }

    return hasil.url;
  }

  async function simpanGuru(e: React.FormEvent) {
    e.preventDefault();

    try {
      let photoUrl = "";

      const fileInput = document.getElementById(
        "photo"
      ) as HTMLInputElement;

      if (fileInput.files && fileInput.files.length > 0) {
        photoUrl = await uploadPhoto(fileInput.files[0]);
      }

      const res = await fetch("/api/admin/guru", {
        method: "POST",
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
        alert("Gagal menyimpan guru.");
        return;
      }

      alert("Guru berhasil ditambahkan.");

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
        Tambah Guru
      </h1>

      <form
        onSubmit={simpanGuru}
        className="space-y-5"
      >
        <input
          type="text"
          placeholder="Nama Guru"
          className="w-full rounded border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Jabatan"
          className="w-full rounded border p-3"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />

        <input
          id="photo"
          type="file"
          accept="image/*"
          className="w-full rounded border p-3"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-blue-700 px-6 py-3 text-white"
          >
            Simpan Guru
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