"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface News {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export default function EditBeritaForm({
  berita,
}: {
  berita: News;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(berita.title);
  const [date, setDate] = useState(berita.date);
  const [image, setImage] = useState(berita.image);
  const [excerpt, setExcerpt] = useState(berita.excerpt);
  const [content, setContent] = useState(berita.content);

  async function simpan(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/admin/berita/${berita.id}`, {
      method: "PUT",
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
      alert("Gagal mengubah berita");
      return;
    }

    alert("Berita berhasil diubah");

    router.push("/admin/berita");
    router.refresh();
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Berita
      </h1>

      <form onSubmit={simpan} className="space-y-5">

        <input
          type="text"
          className="w-full rounded border p-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          className="w-full rounded border p-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          className="w-full rounded border p-3"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          rows={3}
          className="w-full rounded border p-3"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <textarea
          rows={8}
          className="w-full rounded border p-3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
            onClick={() => router.push("/admin/berita")}
            className="rounded bg-gray-500 px-6 py-3 text-white"
          >
            Batal
          </button>
        </div>

      </form>
    </main>
  );
}