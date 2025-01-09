"use client";
import Link from "next/link";
import Header from "./componentsPaginaInicial/Header"; // Importando Header
import Footer from "./componentsPaginaInicial/Footer"; // Importando Footer

export default function Home() {
  return (
    <div>
      <Header /> {/* Inserindo o Header */}
      
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh", // Ajustado para dar espaço para o footer
          gap: "2rem",
          background: "#f0f0f0",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Bem-vindo!</h1>
        <p style={{ fontSize: "1.5rem" }}>Escolha para onde deseja ir:</p>

        <div style={{ display: "flex", gap: "2rem" }}>
          <Link href="/ginasio">
            <button
              style={{
                padding: "1rem 2rem",
                fontSize: "1.5rem",
                background: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#005bb5";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#0070f3";
              }}
            >
              Ginásio
            </button>
          </Link>

          <Link href="/barbearia">
            <button
              style={{
                padding: "1rem 2rem",
                fontSize: "1.5rem",
                background: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#005bb5";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#0070f3";
              }}
            >
              Barbearia
            </button>
          </Link>
        </div>
      </div>

      <Footer /> {/* Inserindo o Footer */}
    </div>
  );
}
