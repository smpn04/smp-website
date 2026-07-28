"use client";

import { useEffect, useState } from "react";

export default function PrincipalWelcome() {
  const [data, setData] = useState({
    kepalaSekolah: "Nama Kepala Sekolah, S.Pd., M.Pd.",
    fotoKepsek: "",
    sambutan:
      "Assalamu’alaikum Warahmatullahi Wabarakatuh. Selamat datang di website resmi UPT SMP Negeri 4 Duampanua. Puji syukur kita panjatkan kehadirat Allah SWT atas terwujudnya media informasi ini.",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("profilSekolah");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setData({
        kepalaSekolah: parsed.kepalaSekolah || data.kepalaSekolah,
        fotoKepsek: parsed.fotoKepsek || "",
        sambutan: parsed.sambutan || data.sambutan,
      });
    }
  }, []);

  return (
    <section id="sambutan" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          
          {/* TAMPILAN FOTO */}
          <div className="flex justify-center">
            {data.fotoKepsek ? (
              <img
                src={data.fotoKepsek}
                alt={data.kepalaSekolah}
                className="h-72 w-56 object-cover rounded-xl border-4 border-blue-900 shadow-lg"
              />
            ) : (
              <div className="h-64 w-56 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-4">
                <span className="text-5xl mb-2">👨‍💼</span>
                <span className="text-xs text-slate-400 font-medium">
                  Belum ada foto. Upload melalui Admin Profil.
                </span>
              </div>
            )}
          </div>

          {/* TEKS SAMBUTAN */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-yellow-400 pb-2 inline-block">
              Sambutan Kepala Sekolah
            </h2>
            <p className="text-slate-600 leading-relaxed italic">
              "{data.sambutan}"
            </p>
            <div className="pt-2">
              <p className="font-bold text-slate-800">{data.kepalaSekolah}</p>
              <p className="text-xs text-slate-500">Kepala UPT SMPN 4 Duampanua</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}