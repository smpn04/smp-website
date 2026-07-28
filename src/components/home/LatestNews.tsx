"use client";

import { useEffect, useState } from "react";

interface Berita {
  id?: number | string;
  judul: string;
  tanggal: string;
  foto?: string;
  gambar?: string;
  ringkasan?: string;
  konten?: string;
  status?: string;
}

const initialBerita: Berita[] = [
  {
    id: 1,
    judul: "Kegiatan MPLS Tahun Ajaran Baru",
    tanggal: "2026-07-13",
    ringkasan: "Pelaksanaan Masa Pengenalan Lingkungan Sekolah UPT SMPN 4 Duampanua.",
    status: "Publish",
  },
  {
    id: 2,
    judul: "Pelayanan Public dan Administrasi Sekolah",
    tanggal: "2026-06-27",
    ringkasan: "Peningkatan kualitas layanan administrasi dan informasi publik sekolah.",
    status: "Publish",
  },
];

export default function LatestNews() {
  const [beritaList, setBeritaList] = useState<Berita[]>(initialBerita);

  useEffect(() => {
    // Cari data di localStorage dari berbagai kemungkinan key admin
    const saved =
      localStorage.getItem("beritaSekolah") ||
      localStorage.getItem("berita") ||
      localStorage.getItem("newsData");

    if (saved) {
      try {
        const parsed: Berita[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const published = parsed.filter(
            (item) =>
              !item.status ||
              item.status === "Publish" ||
              item.status === "publish"
          );
          setBeritaList(published.length > 0 ? published : parsed);
        }
      } catch (error) {
        console.error("Error parsing berita:", error);
      }
    }
  }, []);

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
          {beritaList.slice(0, 3).map((item, index) => {
            const imageSrc = item.foto || item.gambar;
            return (
              <div
                key={item.id || index}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="h-52 w-full bg-slate-200 flex items-center justify-center overflow-hidden">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={item.judul}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-slate-400 text-sm font-semibold">
                        📷 Foto Berita
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-semibold text-slate-400">
                      {item.tanggal}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-slate-800 leading-snug">
                      {item.judul}
                    </h3>
                    {(item.ringkasan || item.konten) && (
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                        {item.ringkasan || item.konten}
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