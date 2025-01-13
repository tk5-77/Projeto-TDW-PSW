"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  useEffect(() => {
    document.body.style.overflowX = "hidden"; // Impede o scroll horizontal
    return () => {
      document.body.style.overflowX = "auto"; // Restaura o scroll ao desmontar o componente
    };
  }, []);

  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        padding: "2rem", // Aumentado o padding para maior espaçamento
        position: "fixed",
        width: "100%",
        bottom: 0,
      }}
    >
      <p style={{ margin: 0, fontSize: "1.5rem" }}>
        © 2025 Cinfães Fit & Barber. Todos os direitos reservados.
      </p>
      {/* Link para a página de login */}
      <Link
        href="/login"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "1.2rem",
        }}
      >
        Login
      </Link>
    </footer>
  );
}
