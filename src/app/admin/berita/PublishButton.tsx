"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: number;
  published: boolean;
};

export default function PublishButton({
  id,
  published,
}: Props) {
  const router = useRouter();

  async function ubahStatus() {
    const res = await fetch(
      `/api/admin/berita/publish/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: !published,
        }),
      }
    );

    const hasil = await res.json();

    if (!hasil.success) {
      alert("Gagal mengubah status.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={ubahStatus}
      className={`rounded px-3 py-2 text-white ${
        published
          ? "bg-yellow-500"
          : "bg-green-600"
      }`}
    >
      {published ? "Unpublish" : "Publish"}
    </button>
  );
}