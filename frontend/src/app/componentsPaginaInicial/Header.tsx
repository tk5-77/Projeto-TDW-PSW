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
          maxWidth: "100vw", // Garante que não ultrapasse a largura da tela
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box", // Inclui padding na largura total
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
            Home
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
          <Link
            href="/registo"
            style={{
              color: "#fff",  
              textDecoration: "none",
            }}
          >
            Register
          </Link>
        </nav>
      </header>
    );
  }