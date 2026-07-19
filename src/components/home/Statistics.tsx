const stats = [
  {
    number: "850+",
    title: "Siswa",
  },
  {
    number: "52",
    title: "Guru",
  },
  {
    number: "24",
    title: "Kelas",
  },
  {
    number: "120",
    title: "Prestasi",
  },
];

export default function Statistics() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border p-8 text-center shadow-sm"
          >
            <h2 className="text-4xl font-bold text-blue-900">
              {item.number}
            </h2>

            <p className="mt-2 text-gray-600">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}