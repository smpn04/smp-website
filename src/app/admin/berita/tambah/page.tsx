"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahBeritaPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);

  async function simpanBerita(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/berita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          date,
          image,
          excerpt,
          content,
        }),
      });

      const hasil = await res.json();

      if (!res.ok || !hasil.success) {
        alert(hasil.message || "Gagal menyimpan berita");
        return;
      }

      alert("Berita berhasil disimpan");

      router.push("/admin/berita");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan berita.");
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Tambah Berita
      </h1>

      <form onSubmit={simpanBerita} className="space-y-5">

        <input
          type="text"
          placeholder="Judul Berita"
          className="w-full rounded border p-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-full rounded border p-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <div className="space-y-2">

          <input
            type="file"
            accept="image/*"
            className="w-full rounded border p-3"
            onChange={async (e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              setUploading(true);

              const formData = new FormData();
              formData.append("file", file);

              const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
              });

              const hasil = await res.json();

              setUploading(false);

              if (!hasil.success) {
                alert("Upload gagal");
                return;
              }

              setImage(hasil.filename);
            }}
          />

          {uploading && (
            <p className="text-blue-600">
              Sedang mengupload gambar...
            </p>
          )}

          {image && (
            <div className="rounded border bg-green-50 p-3">
              <p className="font-semibold text-green-700">
                ✓ Upload berhasil
              </p>

              <p className="text-sm text-gray-600">
                {image}
              </p>
            </div>
          )}

        </div>

        <textarea
          rows={3}
          placeholder="Ringkasan Berita"
          className="w-full rounded border p-3"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
        />

        <textarea
          rows={8}
          placeholder="Isi Berita"
          className="w-full rounded border p-3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-blue-700 px-6 py-3 text-white"
            disabled={uploading}
          >
            Simpan Berita
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/berita")}
            className="rounded bg-gray-500 px-6 py-3 text-white"
          >
            Kembali
          </button>
        </div>

      </form>
    </main>
  );
}