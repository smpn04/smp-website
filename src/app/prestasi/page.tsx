import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import achievements from "../../data/achievements";

export default function PrestasiPage() {
  return (
    <>
      <Header />

      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Prestasi Sekolah
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            Prestasi yang telah diraih oleh UPT SMP Negeri 4 Duampanua.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border bg-white p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold">
                {item.icon} {item.title}
              </h2>

              <p className="mt-2 text-gray-600">
                {item.level}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Tahun {item.year}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}