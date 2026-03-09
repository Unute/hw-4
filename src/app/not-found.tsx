import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "16px" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>404 — Страница не найдена</h2>
      <p style={{ color: "#666" }}>Запрошенная страница не существует.</p>
      <Link
        href="/"
        style={{ padding: "10px 24px", background: "#518581", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "1rem" }}
      >
        На главную
      </Link>
    </div>
  );
}
