"use client";

import { useEffect, useState } from "react";

export default function PrincipalWelcome() {
  const [data, setData] = useState({
    kepalaSekolah: "Nama Kepala Sekolah, S.Pd., M.Pd.",
    sambutan:
      "Assalamu’alaikum Warahmatullahi Wabarakatuh. Selamat datang di website resmi UPT SMP Negeri 4 Duampanua. Puji syukur kita panjatkan kehadirat Allah SWT atas terwujudnya media informasi ini.",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("profilSekolah");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setData({
        kepalaSekolah: parsed.kepalaSekolah || data.kepalaSekolah,
        sambutan: parsed.sambutan || data.sambutan,
      });
    }
  }, []);

  return (
    <section id="sambutan" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          <div className="flex justify-center">
            <div className="h-64 w-56 rounded-xl bg-slate-200 border-4 border-blue-900 shadow-md flex flex-col items-center justify-center">
              <span className="text-6xl">👨‍💼</span>
              <span className="mt-2 text-xs text-slate-500 font-medium">Foto Kepala Sekolah</span>
            </div>
          </div>

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