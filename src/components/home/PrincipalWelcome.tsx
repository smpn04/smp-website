"use client";

import { useEffect, useState } from "react";

export default function PrincipalWelcome() {
  const [profil, setProfil] = useState<{
    namaKepsek?: string;
    sambutanKepsek?: string;
    fotoKepsek?: string;
  }>({});

  useEffect(() => {
    // Ambil data profil & foto dari API server, bukan localStorage
    async function fetchProfil() {
      try {
        const res = await fetch("/api/admin/profil", { cache: "no-store" });
        if (res.ok) {
          const result = await res.json();
          const data = result.data || result;
          setProfil(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data profil kepala sekolah:", error);
      }
    }

    fetchProfil();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* FOTO KEPALA SEKOLAH */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-lg bg-slate-100 border border-slate-200">
              {profil.fotoKepsek ? (
                <img
                  src={profil.fotoKepsek}
                  alt={profil.namaKepsek || "Kepala Sekolah"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400">
                  <span className="text-5xl mb-2">👨‍💼</span>
                  <p className="text-xs">Belum ada foto. Upload melalui Admin Profil.</p>
                </div>
              )}
            </div>
          </div>

          {/* TEXT SAMBUTAN */}
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 border-b-4 border-yellow-400 pb-2 inline-block">
              Sambutan Kepala Sekolah
            </h2>
            <p className="text-slate-600 leading-relaxed italic text-sm md:text-base">
              "{profil.sambutanKepsek || "Selamat datang di website resmi sekolah kami."}"
            </p>
            <div>
              <h3 className="font-bold text-slate-900 text-base md:text-lg">
                {profil.namaKepsek || "Nama Kepala Sekolah"}
              </h3>
              <p className="text-xs md:text-sm text-slate-500">
                Kepala UPT SMPN 4 Duampanua
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}