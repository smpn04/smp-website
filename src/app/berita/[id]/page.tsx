import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailBeritaPage({ params }: Props) {
  const { id } = await params;

  const article = await prisma.news.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />

      <section className="bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-5xl font-bold">
            {article.title}
          </h1>

          <p className="mt-4 text-blue-100">
            {article.date}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
<p className="mb-4 text-red-600 font-bold">
  {article.image}
</p>
        <Image
          src={article.image}
          alt={article.title}
          width={1200}
          height={700}
          className="mb-8 w-full rounded-xl object-cover"
        />

        <div className="prose max-w-none">
          <p className="whitespace-pre-line text-lg leading-8">
            {article.content}
          </p>
        </div>

        <Link
          href="/berita"
          className="mt-8 inline-block rounded-lg bg-blue-900 px-6 py-3 text-white"
        >
          ← Kembali ke Berita
        </Link>

      </section>

      <Footer />
    </>
  );
}