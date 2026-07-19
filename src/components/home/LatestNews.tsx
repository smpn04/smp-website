export default function LatestNews() {
  const news = [
    {
      title: "Siswa SMP Negeri Raih Juara Olimpiade Sains",
      date: "10 Juli 2026",
      image: "https://placehold.co/600x400",
    },
    {
      title: "Kegiatan MPLS Tahun Ajaran Baru",
      date: "8 Juli 2026",
      image: "https://placehold.co/600x400",
    },
    {
      title: "Pembukaan PPDB Gelombang 2",
      date: "5 Juli 2026",
      image: "https://placehold.co/600x400",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-blue-900">
          Berita Terbaru
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Informasi terbaru mengenai kegiatan dan prestasi sekolah.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {news.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <p className="text-sm text-gray-500">{item.date}</p>

                <h3 className="mt-2 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <button className="mt-6 rounded-lg bg-blue-900 px-5 py-2 text-white hover:bg-blue-800">
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