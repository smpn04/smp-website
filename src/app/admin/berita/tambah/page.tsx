"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TambahBeritaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFilesAdded = (newFiles: FileList | File[]) => {
    const incomingArray = Array.from(newFiles);
    if (incomingArray.length === 0) return;

    const updatedFiles = [...selectedFiles, ...incomingArray];
    setSelectedFiles(updatedFiles);

    const newUrls = incomingArray.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFilesAdded(e.target.files);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    URL.revokeObjectURL(previewUrls[indexToRemove]);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      alert("Judul berita wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      const uploadedImageUrls: string[] = [];

      if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) {
          const formData = new FormData();
          formData.append("file", selectedFiles[i]);

          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          const uploadResult = await uploadRes.json();

          if (!uploadRes.ok || !uploadResult.success) {
            alert(
              `[GAGAL UPLOAD FOTO KE-${i + 1}]\nPesan: ${
                uploadResult.message || "Gagal upload ke storage"
              }`
            );
            setLoading(false);
            return;
          }

          uploadedImageUrls.push(uploadResult.url);
        }
      }

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
          images: uploadedImageUrls,
          published: true,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        alert("Berita Berhasil Disimpan beserta semua foto!");
        router.push("/admin/berita");
        router.refresh();
      } else {
        alert(
          `[GAGAL SIMPAN DATABASE]\nPesan: ${
            result.message || "Gagal menyimpan ke database"
          }`
        );
      }
    } catch (error: any) {
      alert(`[ERROR SYSTEM]: ${error.message}`);
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

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl border shadow-sm"
      >
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
              Foto Berita (Bisa Pilih Banyak)
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              Tahan tombol <code className="font-bold">Ctrl</code> atau{" "}
              <code className="font-bold">Shift</code> saat memilih foto untuk memilih lebih dari 1 foto.
            </p>
          </div>
        </div>

        {/* PREVIEW FOTO TERPILIH */}
        {previewUrls.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-600 mb-2">
              Preview Foto Terpilih ({previewUrls.length} foto):
            </p>
            <div className="flex flex-wrap gap-3">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-24 rounded border object-cover shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow hover:bg-red-700 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
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
          disabled={loading}
          className="rounded-lg bg-blue-900 px-6 py-3 text-sm font-bold text-white hover:bg-blue-800 disabled:opacity-50 transition"
        >
          {loading
            ? `Mengunggah (${selectedFiles.length} foto)...`
            : "Simpan Berita"}
        </button>
      </form>
    </div>
  );
}