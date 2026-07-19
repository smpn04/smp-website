export default function Gallery() {
  const images = [
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
    "https://placehold.co/600x400",
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-bold text-blue-900">
          Galeri Sekolah
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Dokumentasi berbagai kegiatan dan fasilitas sekolah.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Galeri ${index + 1}`}
              className="h-64 w-full rounded-2xl object-cover shadow-md transition hover:scale-105"
            />
          ))}
        </div>
      </div>
    </section>
  );
}