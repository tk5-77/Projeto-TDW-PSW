"use client"
import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "#0070f3",
        color: "#fff",
        padding: "1rem 0rem",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.8rem" }}>Plataforma de Serviços</h1>
      <nav>
        <Link href="/" style={{ color: "#fff", margin: "0 1rem", textDecoration: "none" }}>
          Início
        </Link>
        <Link href="/ginasio" style={{ color: "#fff", margin: "0 1rem", textDecoration: "none" }}>
          Ginásio
        </Link>
        <Link href="/barbearia" style={{ color: "#fff", margin: "0 1rem", textDecoration: "none" }}>
          Barbearia
        </Link>
      </nav>
    </header>
  );
}
