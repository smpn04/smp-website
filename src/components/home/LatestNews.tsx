"use client";

import { useEffect, useState } from "react";

export default function LatestNews() {
  const [beritaList, setBeritaList] = useState<any[]>([]);

  useEffect(() => {
    // Ambil semua kemungkinan data dari localStorage admin
    const saved =
      localStorage.getItem("beritaSekolah") ||
      localStorage.getItem("berita") ||
      localStorage.getItem("newsData");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBeritaList(parsed);
        }
      } catch (e) {
        console.error("Gagal membaca berita:", e);
      }
    }
  }, []);

  // Jika belum ada data dari admin, tampilkan contoh berita bawaan dengan gambar Unsplash
  const defaultBerita = [
    {
      id: 1,
      judul: "Kegiatan MPLS Tahun Ajaran Baru",
      tanggal: "2026-07-13",
      gambar: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=60",
      ringkasan: "Pelaksanaan Masa Pengenalan Lingkungan Sekolah UPT SMPN 4 Duampanua.",
    },
    {
      id: 2,
      judul: "Pelayanan Public dan Administrasi Sekolah",
      tanggal: "2026-06-27",
      gambar: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=60",
      ringkasan: "Peningkatan kualitas layanan administrasi dan informasi publik sekolah.",
    },
  ];

  const displayData = beritaList.length > 0 ? beritaList : defaultBerita;

  return (
    <section className="py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900">Berita Terbaru</h2>
          <p className="mt-2 text-sm text-slate-600">
            Informasi terbaru mengenai kegiatan dan prestasi sekolah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayData.slice(0, 3).map((item, index) => {
            // Mengecek semua variasi nama properti foto yang mungkin digunakan admin
            const imgSrc =
              item.foto ||
              item.gambar ||
              item.image ||
              item.imageUrl ||
              item.cover;

            return (
              <div
                key={item.id || index}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="h-52 w-full bg-slate-200 overflow-hidden">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={item.judul || item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm font-semibold">
                        📷 Foto Berita
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-semibold text-slate-400">
                      {item.tanggal || item.date}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-slate-800 leading-snug">
                      {item.judul || item.title}
                    </h3>
                    {(item.ringkasan || item.konten || item.deskripsi) && (
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                        {item.ringkasan || item.konten || item.deskripsi}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button className="rounded-lg bg-blue-900 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800 transition">
                    Baca Selengkapnya
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}