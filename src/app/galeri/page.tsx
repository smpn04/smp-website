import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Image from "next/image";
import gallery from "../../data/gallery";

export default function GaleriPage() {
  return (
    <>
      <Header />

      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">Galeri</h1>

          <p className="mt-4 text-lg text-blue-100">
            Dokumentasi kegiatan UPT SMP Negeri 4 Duampanua.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gallery.map((photo) => (
            <div
              key={photo.id}
              className="overflow-hidden rounded-xl border shadow-md"
            >
              <Image
                src={photo.image}
                alt={photo.title}
                width={600}
                height={400}
                className="h-64 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  {photo.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}