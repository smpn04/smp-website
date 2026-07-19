import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function GuruPage() {
  const teachers = await prisma.teacher.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <>
      <Header />

      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Data Guru
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            Tenaga pendidik UPT SMP Negeri 4 Duampanua.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {teachers.map((teacher) => (

            <div
              key={teacher.id}
              className="rounded-2xl border bg-white p-6 text-center shadow-md"
            >

              <Image
                src={teacher.photo}
                alt={teacher.name}
                width={150}
                height={150}
                className="mx-auto h-40 w-40 rounded-full object-cover"
              />

              <h3 className="mt-6 text-xl font-bold">
                {teacher.name}
              </h3>

              <p className="mt-2 text-gray-600">
                {teacher.position}
              </p>

            </div>

          ))}

        </div>
      </section>

      <Footer />
    </>
  );
}