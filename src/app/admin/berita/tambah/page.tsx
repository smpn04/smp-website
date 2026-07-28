// Handler Upload Foto yang Lebih Aman & Anti Fail
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Batasi ukuran awal file (misal maksimal 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran foto terlalu besar! Maksimal 10MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const rawBase64 = event.target?.result as string;
      
      if (!rawBase64) {
        alert("Gagal membaca file foto.");
        return;
      }

      // Buat objek gambar untuk dikompres
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Gunakan format JPEG dengan kualitas 70%
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
            setImage(compressedBase64);
          } else {
            // Fallback jika canvas gagal: gunakan Base64 asli
            setImage(rawBase64);
          }
        } catch (err) {
          console.warn("Kompresi canvas gagal, menggunakan gambar asli:", err);
          setImage(rawBase64); // Fallback ke file asli
        }
      };

      img.onerror = () => {
        // Fallback jika Image onload gagal/error saat baca kamera HP
        setImage(rawBase64);
      };

      img.src = rawBase64;
    };

    reader.onerror = () => {
      alert("Gagal membaca file dari galeri/kamera.");
    };

    reader.readAsDataURL(file);
  };