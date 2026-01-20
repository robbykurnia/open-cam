"use client";

import { useRef, useState } from "react";

export default function CameraNativePage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Buat URL sementara untuk preview
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Ambil Foto (Native Camera)</h2>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"   // kamera belakang
        onChange={handlePhoto}
        style={{ display: "none" }}
      />

      <button onClick={() => inputRef.current?.click()}>
        📷 Buka Kamera HP
      </button>

      {preview && (
        <div style={{ marginTop: 20 }}>
          <h3>Preview Hasil Foto:</h3>
          <img
            src={preview}
            style={{ width: 300, border: "1px solid #ccc" }}
          />
        </div>
      )}
    </div>
  );
}
