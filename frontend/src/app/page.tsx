"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "./componentsPaginaInicial/Header"; // Importando Header
import Footer from "./componentsPaginaInicial/Footer"; // Importando Footer

export default function Home() {
  useEffect(() => {
    document.body.style.overflowX = "hidden"; // Impede o scroll horizontal
    return () => {
      document.body.style.overflowX = "auto"; // Restaura o scroll ao desmontar o componente
    };
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <Header /> {/* Inserindo o Header */}
      
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh", // Ajustado para dar espaço para o footer
          gap: "2rem",
          background: "#f0f0f0",
          padding: "2rem",
          borderBottom: "1px solid #ddd", // Adicionando uma linha sutil separando a seção
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "1.5rem",
            color: "#333",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Bem-vindo!
        </h1>
        <p style={{ fontSize: "1.5rem", color: "#555", marginBottom: "2rem" }}>
          Escolha para onde deseja ir:
        </p>

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
                transition: "background 0.3s ease, transform 0.3s ease",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#005bb5";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#0070f3";
                e.currentTarget.style.transform = "scale(1)";
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
                transition: "background 0.3s ease, transform 0.3s ease",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#005bb5";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#0070f3";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Barbearia
            </button>
          </Link>
        </div>
      </div>

      {/* Seção "Sobre Nós" */}
      <div
        style={{
          padding: "3rem 2rem",
          background: "#ffffff",
          textAlign: "center",
          color: "#333",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "15px",
          margin: "2rem auto",
          width: "80%", // Ajustado para largura menor
          maxWidth: "600px", // Limita a largura máxima
        }}
      >
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#0070f3", fontWeight: "600" }}>Sobre Nós</h2>
        <p style={{ fontSize: "1.3rem", lineHeight: "1.8", color: "#555", marginBottom: "1.5rem" }}>
          Somos uma empresa dedicada a oferecer os melhores serviços para o seu bem-estar e conforto.
          Com um ginásio moderno e uma barbearia de estilo único, garantimos qualidade e uma experiência única para cada cliente.
        </p>
      </div>

      {/* Seção "Contacte-nos" */}
      <div
        style={{
          padding: "3rem 2rem",
          background: "#f7f7f7",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "15px",
          margin: "2rem auto",
          width: "80%", // Ajustado para largura menor
          maxWidth: "600px", // Limita a largura máxima
        }}
      >
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "#0070f3", fontWeight: "600" }}>Contacte-nos</h2>
        <p style={{ fontSize: "1.3rem", marginBottom: "1.5rem", color: "#555" }}>
          Se tiver alguma dúvida ou deseja mais informações, não hesite em entrar em contato conosco!
        </p>
        <div>
          <p style={{ fontSize: "1.3rem", color: "#333" }}>
            Email: <span style={{ color: "#0070f3" }}>contato@exemplo.com</span>
          </p>
          <p style={{ fontSize: "1.3rem", color: "#333" }}>
            Telefone: <span style={{ color: "#0070f3" }}>(11) 1234-5678</span>
          </p>
        </div>
      </div>

      <Footer /> {/* Inserindo o Footer */}
    </div>
  );
}
