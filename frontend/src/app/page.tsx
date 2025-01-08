"use client"
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
          gap: "1rem",
          background: "#f0f0f0",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Bem-vindo!</h1>
        <p style={{ fontSize: "1.2rem" }}>Escolha para onde deseja ir:</p>

        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/ginasio">
            <button
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                background: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
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
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                background: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
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
