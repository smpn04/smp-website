import { FaUserGraduate, FaFlask, FaBook, FaTrophy } from "react-icons/fa";

const features = [
  {
    icon: <FaUserGraduate size={40} />,
    title: "Guru Profesional",
    description: "Tenaga pendidik yang berpengalaman dan kompeten.",
  },
  {
    icon: <FaFlask size={40} />,
    title: "Laboratorium Lengkap",
    description: "Fasilitas laboratorium IPA dan komputer yang modern.",
  },
  {
    icon: <FaBook size={40} />,
    title: "Perpustakaan",
    description: "Ribuan koleksi buku untuk menunjang proses belajar.",
  },
  {
    icon: <FaTrophy size={40} />,
    title: "Prestasi",
    description: "Berbagai prestasi akademik dan non-akademik tingkat daerah hingga nasional.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-blue-900">
          Mengapa Memilih SMP Negeri?
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Sekolah dengan fasilitas lengkap, guru profesional, dan lingkungan belajar yang nyaman.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border p-8 text-center shadow-sm transition hover:shadow-lg"
            >
              <div className="flex justify-center text-blue-700">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}