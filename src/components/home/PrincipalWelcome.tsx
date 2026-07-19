export default function PrincipalWelcome() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
        <div>
          <img
            src="https://placehold.co/500x600"
            alt="Kepala Sekolah"
            className="rounded-2xl shadow-lg"
          />
        </div>

        <div>
          <p className="font-semibold text-blue-700">
            Sambutan Kepala Sekolah
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Selamat Datang di Website Resmi SMP Negeri
          </h2>

          <p className="mt-6 leading-8 text-gray-600">
            Website ini menjadi media informasi resmi sekolah yang
            memberikan berbagai informasi mengenai kegiatan akademik,
            prestasi siswa, layanan PPDB, serta berbagai program sekolah.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            Kami berkomitmen menciptakan lingkungan belajar yang
            nyaman, inovatif, dan berkarakter sehingga mampu
            menghasilkan generasi yang unggul.
          </p>

          <div className="mt-8">
            <h3 className="text-xl font-bold">
              Drs. Nama Kepala Sekolah
            </h3>

            <p className="text-gray-500">
              Kepala SMP Negeri
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}