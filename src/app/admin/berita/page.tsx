const handleTogglePublish = async (item: NewsItem) => {
    if (!item?.id) return;

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
        alert(`Gagal: ${result.message || "Terjadi kesalahan server"}`);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan jaringan!");
    } finally {
      setActionLoading(null);
    }
  };