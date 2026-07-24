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
    try {
      const res = await fetch(`/api/admin/gallery/publish/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: !published,
        }),
      });

      console.log("STATUS:", res.status);

      const hasil = await res.json();

      console.log("HASIL:", hasil);

      if (!hasil.success) {
        alert(hasil.message || "Gagal mengubah status.");
        return;
      }

      router.refresh();

    } catch (error) {
      console.error("ERROR FETCH:", error);
      alert("Terjadi kesalahan.");
    }
  }

  return (
    <button
      type="button"
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