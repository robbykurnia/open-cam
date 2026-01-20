"use client";

import { useState } from "react";
import KycSelfieModal from "./camp";

export default function KycPage() {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selfie, setSelfie] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSuccess = (file: File, base64: string) => {
    setSelfie(file);
    setPreview(base64);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>KYC Verification</h2>

      <button onClick={() => setOpen(true)}>
        Ambil Selfie
      </button>

      {preview && (
        <div style={{ marginTop: 20 }}>
          <h3>Hasil Selfie</h3>
          <img src={preview} width={300} />
        </div>
      )}

      <KycSelfieModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
