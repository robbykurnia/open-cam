"use client";

import Webcam from "react-webcam";
import { useRef, useState } from "react";

interface KycSelfieModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (file: File, base64: string) => void;
}

const FRAME = {
  top: "15%",      // harus sama dengan gradient atas
  bottom: "30%",   // harus sama dengan gradient bawah
  side: "30%",     // harus sama dengan gradient kiri-kanan
  radius: "16px",
};

export default function KycSelfieModal({
  open,
  onClose,
  onSuccess,
}: KycSelfieModalProps) {
  const webcamRef = useRef<Webcam | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  if (!open) return null;

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot({
      width: 1280,
      height: 720,
    });

    if (!imageSrc) return;

    setPhoto(imageSrc);

    const res = await fetch(imageSrc);
    const blob = await res.blob();

    const selfieFile = new File([blob], "selfie-kyc.jpg", {
      type: "image/jpeg",
    });

    setFile(selfieFile);
    onSuccess(selfieFile, imageSrc);
  };

  const reset = () => {
    setPhoto(null);
    setFile(null);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "black",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
          fontSize: 18,
          fontWeight: 600,
          zIndex: 20,
        }}
      >
        Selfie KYC
      </div>

      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "rgba(255,255,255,0.2)",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: 8,
          zIndex: 20,
        }}
      >
        ✕ Tutup
      </button>

      {!photo && (
        <>
          {/* VIDEO FULLSCREEN */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100vh",
              background: "black",
              overflow: "hidden",
            }}
          >
            <Webcam
              ref={webcamRef}
              audio={false}
              mirrored
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "user",
                width: { ideal: 1920 },
                height: { ideal: 1080 },
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* OVERLAY GELAP DI LUAR AREA WAJAH */}
        <div
  style={{
    position: "fixed",
    top: FRAME.top,
    left: `calc(${FRAME.side} + (100% - ${FRAME.side} * 2) / 2)`,
    transform: "translateX(-50%)",

    width: `calc(100% - ${FRAME.side} * 2)`,
    height: `calc(100% - ${FRAME.top} - ${FRAME.bottom})`,

    borderRadius: FRAME.radius,
    border: "3px dashed white",
    zIndex: 10,
    pointerEvents: "none",
    background: "transparent",
  }}
/>

          <div
  style={{
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 5,
    background: `
      linear-gradient(#000 0 0) top/100% ${FRAME.top} no-repeat,
      linear-gradient(#000 0 0) bottom/100% ${FRAME.bottom} no-repeat,
      linear-gradient(#000 0 0) left/${FRAME.side} 100% no-repeat,
      linear-gradient(#000 0 0) right/${FRAME.side} 100% no-repeat
    `,
    opacity: 0.65,
  }}
/>

          {/* <div
            style={{
              position: "fixed",
              inset: 0,
              background:
                "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.65) 36%)",
              pointerEvents: "none",
              zIndex: 5,
            }}
          /> */}



          {/* TEKS PANDUAN */}
          <div
            style={{
              position: "fixed",
              bottom: 100,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.6)",
              color: "white",
              padding: "10px 14px",
              borderRadius: 8,
              fontSize: 12,
              textAlign: "center",
              zIndex: 10,
            }}
          >
            Posisikan wajah di dalam lingkaran
          </div>

          {/* TOMBOL FOTO */}
          <button
            onClick={capture}
            style={{
              position: "fixed",
              bottom: 30,
              left: "50%",
              transform: "translateX(-50%)",
              width: 70,
              height: 70,
              borderRadius: "50%",
              border: "none",
              fontSize: 28,
              background: "white",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            📸
          </button>
        </>
      )}

      {photo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "black",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            zIndex: 30,
          }}
        >
          <h3>Preview</h3>

          <img
            src={photo}
            style={{
              width: 320,
              borderRadius: 16,
            }}
          />

          {file && (
            <div style={{ fontSize: 12, textAlign: "center" }}>
              <div>📁 Nama: {file.name}</div>
              <div>📦 Type: {file.type}</div>
              <div>
                📏 Size: {(file.size / 1024).toFixed(1)} KB
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={reset}>Ulangi</button>
            <button onClick={onClose}>Selesai</button>
          </div>
        </div>
      )}
    </div>
  );
}
