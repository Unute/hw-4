'use client';

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "16px" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Что-то пошло не так</h2>
      <p style={{ color: "#666" }}>{error.message ?? "Произошла непредвиденная ошибка"}</p>
      <button
        onClick={reset}
        style={{ padding: "10px 24px", background: "#518581", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem" }}
      >
        Попробовать снова
      </button>
    </div>
  );
}
