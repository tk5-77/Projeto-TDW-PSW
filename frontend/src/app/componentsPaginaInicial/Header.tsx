"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "#0070f3",
        color: "#fff",
        padding: "2rem", // Aumentado o padding para mais espaçamento
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "2.5rem" }}> {/* Aumentado o tamanho do título */}
      Cinfães Fit & Barber
      </h1>
      <nav style={{ fontSize: "1.5rem" }}> {/* Aumentado o tamanho das opções do menu */}
        <Link
          href="/"
          style={{
            color: "#fff",
            margin: "0 2rem", // Aumentado o espaçamento entre os links
            textDecoration: "none",
          }}
        >
          Início
        </Link>
        <Link
          href="/ginasio"
          style={{
            color: "#fff",
            margin: "0 2rem",
            textDecoration: "none",
          }}
        >
          Ginásio
        </Link>
        <Link
          href="/barbearia"
          style={{
            color: "#fff",
            margin: "0 2rem",
            textDecoration: "none",
          }}
        >
          Barbearia
        </Link>
      </nav>
    </header>
  );
}
