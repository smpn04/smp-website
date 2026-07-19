import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

export default function AkademikPage() {
  return (
    <>
      <Header />

      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Akademik
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            Informasi mengenai kegiatan akademik UPT SMP Negeri 4 Duampanua.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
  <h2 className="mb-10 text-center text-3xl font-bold">
    Informasi Akademik
  </h2>

  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

    <div className="rounded-xl border p-6 shadow-md">
      <h3 className="text-xl font-bold">📚 Kurikulum</h3>
      <p className="mt-3 text-gray-600">
        Sekolah menerapkan Kurikulum Nasional untuk mendukung pembelajaran yang berkualitas.
      </p>
    </div>

    <div className="rounded-xl border p-6 shadow-md">
      <h3 className="text-xl font-bold">🧪 Laboratorium</h3>
      <p className="mt-3 text-gray-600">
        Tersedia laboratorium IPA dan komputer untuk kegiatan praktik siswa.
      </p>
    </div>

    <div className="rounded-xl border p-6 shadow-md">
      <h3 className="text-xl font-bold">🎨 Ekstrakurikuler</h3>
      <p className="mt-3 text-gray-600">
        Berbagai kegiatan ekstrakurikuler untuk mengembangkan bakat dan minat siswa.
      </p>
    </div>

    <div className="rounded-xl border p-6 shadow-md">
      <h3 className="text-xl font-bold">🏆 Prestasi</h3>
      <p className="mt-3 text-gray-600">
        Prestasi akademik dan non-akademik yang diraih oleh siswa di berbagai kompetisi.
      </p>
    </div>

  </div>
</section>
      <Footer />
    </>
  );
}