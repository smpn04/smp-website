"use client";

import { useEffect, useState } from "react";

interface Berita {
  id: number;
  judul: string;
  tanggal: string;
  gambar: string;
  ringkasan: string;
}

export default function LatestNews() {
  const [beritaList, setBeritaList] = useState<Berita[]>([
    {
      id: 1,
      judul: "Siswa SMP Negeri Raih Juara Olimpiade Sains",
      tanggal: "10 Juli 2026",
      gambar: "",
      ringkasan: "Siswa UPT SMPN 4 Duampanua berhasil meraih medali emas...",
    },
    {
      id: 2,
      judul: "Kegiatan MPLS Tahun Ajaran Baru",
      tanggal: "8 Juli 2026",
      gambar: "",
      ringkasan: "Pelaksanaan Masa Pengenalan Lingkungan Sekolah...",
    },
    {
      id: 3,
      judul: "Pembukaan PPDB Gelombang 2",
      tanggal: "5 Juli 2026",
      gambar: "",
      ringkasan: "Pendaftaran peserta didik baru gelombang kedua...",
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("beritaSekolah");
    if (saved) {
      setBeritaList(JSON.parse(saved));
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
          {beritaList.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                {/* WADAH FOTO BERITA */}
                <div className="h-52 w-full bg-slate-200 flex items-center justify-center overflow-hidden">
                  {item.gambar ? (
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-slate-400 text-sm font-semibold">
                      📷 Foto Berita (600 × 400)
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
                  {item.ringkasan && (
                    <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                      {item.ringkasan}
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
          ))}
        </div>
      </div>
    </section>
  );
}