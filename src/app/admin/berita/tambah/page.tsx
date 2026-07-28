"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TambahBeritaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");

  // Mengubah Gambar ke Base64 Terkompresi (< 100KB)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsProcessing(true);

    const reader = new FileReader();

    reader.onload = (event) => {
      const rawBase64 = event.target?.result as string;
      if (!rawBase64) {
        setIsProcessing(false);
        return;
      }

      const img = new Image();
      img.src = rawBase64;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800; // Kompres resolusi agar ringan

        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Kompresi JPEG Kualitas 60%
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
          setImage(compressedBase64);
        } else {
          setImage(rawBase64);
        }
        setIsProcessing(false);
      };

      img.onerror = () => {
        setImage(rawBase64);
        setIsProcessing(false);
      };
    };

    reader.onerror = () => {
      alert("Gagal membaca file foto.");
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Judul berita wajib diisi!");
      return;
    }

    if (isProcessing) {
      alert("Foto sedang diproses, tunggu sebentar...");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/berita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          date,
          excerpt,
          content,
          image, // String Base64 langsung dikirim
          published: false,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        alert("Berita & Foto Berhasil Disimpan!");
        router.push("/admin/berita");
        router.refresh();
      } else {
        alert(`Gagal menyimpan: ${result.message || "Terjadi kesalahan server"}`);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">Tambah Berita Baru</h1>
        <Link
          href="/admin/berita"
          className="rounded bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-600 transition"
        >
          Kembali
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Judul Berita *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Masukkan judul berita..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tanggal *
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Foto Berita
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {isProcessing && (
              <p className="text-xs text-blue-600 mt-1 font-medium">
                ⏳ Memproses foto...
              </p>
            )}
            {fileName && !isProcessing && image && (
              <p className="text-xs text-green-600 mt-1 font-medium">
                ✓ Foto Siap Disimpan!
              </p>
            )}
          </div>
        </div>

        {image && !isProcessing && (
          <div>
            <p className="text-xs text-gray-500 mb-1">Preview Foto:</p>
            <img
              src={image}
              alt="Preview"
              className="h-36 w-auto rounded border object-cover shadow-sm"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Ringkasan Berita
          </label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full rounded border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Ringkasan singkat berita..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Isi Berita Lengkap
          </label>
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded border p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Tuliskan berita lengkap di sini..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading || isProcessing}
          className="rounded-lg bg-blue-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-800 disabled:opacity-50 transition"
        >
          {loading ? "Menyimpan Berita..." : isProcessing ? "Memproses Foto..." : "Simpan Berita"}
        </button>
      </form>
    </div>
  );
}