"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Header() {
  useEffect(() => {
    document.body.style.overflowX = "hidden"; // Impede o scroll horizontal
    return () => {
      document.body.style.overflowX = "auto"; // Restaura o scroll ao desmontar o componente
    };
  }, []);

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
      <h1 style={{ margin: 0, fontSize: "2.5rem" }}>
        Cinfães Fit & Barber
      </h1>
      <nav style={{ fontSize: "1.5rem", display: "flex", gap: "2rem" }}>
        <Link
          href="/"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Início
        </Link>
        <Link
          href="/ginasio"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Ginásio
        </Link>
        <Link
          href="/barbearia"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Barbearia
        </Link>
        <Link
          href="/login"
          style={{
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
