import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import extracurriculars from "../../data/extracurriculars";

export default function EkstrakurikulerPage() {
  return (
    <>
      <Header />

      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Ekstrakurikuler
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            Kegiatan ekstrakurikuler UPT SMP Negeri 4 Duampanua.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {extracurriculars.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold">
                {item.icon} {item.name}
              </h2>

              <p className="mt-3 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}