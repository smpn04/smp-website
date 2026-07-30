const handleTogglePublish = async (item: NewsItem) => {
    if (!item?.id) {
      alert("Error: ID Berita tidak ditemukan di item!");
      return;
    }

    setActionLoading(item.id);
    const newStatus = !item.published;

    try {
      const res = await fetch(`/api/admin/berita/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: newStatus }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setNewsList((prev) =>
          prev.map((n) => (n.id === item.id ? { ...n, published: newStatus } : n))
        );
      } else {
        // TAMPILKAN ERROR LENGKAP DARI BACKEND
        console.error("Detail Error Server:", result);
        alert(`GAGAL SERVER [${res.status}]:\n${result.message || JSON.stringify(result)}`);
      }
    } catch (error: any) {
      console.error("Error Network:", error);
      alert(`GAGAL JARINGAN / JS:\n${error?.message || error}`);
    } finally {
      setActionLoading(null);
    }
  };