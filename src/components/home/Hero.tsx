import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative h-[600px] bg-cover bg-center"
     style={{
  backgroundImage: "url('/images/school.png')",
}}
    >
      <div className="absolute inset-0 bg-blue-950/70"></div>

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl font-bold leading-tight">
            Selamat Datang di
            <br />
            UPT SMP Negeri 4 Duampanua
          </h1>

          <p className="mt-6 text-xl text-blue-100">
            Mewujudkan peserta didik yang beriman, berprestasi,
            berkarakter, dan berwawasan lingkungan.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/profil"
              className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-blue-900"
            >
              Profil Sekolah
            </Link>

            <Link
              href="/ppdb"
              className="rounded-lg border border-white px-6 py-3"
            >
              PPDB
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}