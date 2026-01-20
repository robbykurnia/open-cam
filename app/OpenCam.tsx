"use client";

import { useRef, useState } from "react";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  console.log('debug photo', photo)
  console.log('debug stream', stream)

  const openCamera = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user", // "user" = selfie, "environment" = belakang
      },
    });

    setStream(mediaStream);

    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    setPhoto(imageData);
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setStream(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Ambil Foto (Next.js)</h2>

      {!stream && (
        <button onClick={openCamera}>Buka Kamera</button>
      )}

      {stream && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: 300, border: "1px solid #ccc" }}
          />

          <div style={{ marginTop: 10 }}>
            <button onClick={takePhoto}>📸 Ambil Foto</button>
            <button onClick={stopCamera} style={{ marginLeft: 10 }}>
              Tutup Kamera
            </button>
          </div>
        </>
      )}

      {/* Canvas tersembunyi untuk capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {photo && (
        <div style={{ marginTop: 20 }}>
          <h3>Hasil Foto:</h3>
          <img src={photo} style={{ width: 300 }} />
        </div>
      )}
    </div>
  );
}
