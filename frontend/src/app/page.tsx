"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "./componentsPaginaInicial/Header";
import Footer from "./componentsPaginaInicial/Footer";
// IMPORT do cliente de API (caso queira algo no "Home")

export default function Home() {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  const [clickedSobreNos, setClickedSobreNos] = useState(false);
  const [clickedContateNos, setClickedContateNos] = useState(false);

  const handleClickSobreNos = () => {
    setClickedSobreNos(!clickedSobreNos);
  };

  const handleClickContateNos = () => {
    setClickedContateNos(!clickedContateNos);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0, padding: 0, backgroundColor: "#ffffff" }}>
      <Header />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          gap: "2rem",
          background: "#f0f0f0",
          padding: "3rem",
          borderBottom: "1px solid #ddd",
          borderRadius: "15px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            marginBottom: "1.5rem",
            color: "#333",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "2px",
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.1)",
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
                padding: "1.2rem 2.5rem",
                fontSize: "1.6rem",
                background: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                transition: "background 0.3s ease, transform 0.3s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
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
                padding: "1.2rem 2.5rem",
                fontSize: "1.6rem",
                background: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                transition: "background 0.3s ease, transform 0.3s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
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

      <div
        onClick={handleClickSobreNos}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "40vh",
          gap: "2rem",
          background: "#ffffff",
          padding: "2rem",
          borderBottom: "1px solid #ddd",
          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
          borderRadius: "15px",
          boxShadow: clickedSobreNos ? "0 8px 24px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
          transform: clickedSobreNos ? "scale(1.05)" : "scale(1)",
          transition: "all 0.3s ease",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
            color: "#333",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Sobre nós
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "2rem" }}>
          Somos uma empresa que oferece serviços de ginásio e barbearia de alta qualidade. Nosso objetivo é fornecer um ambiente seguro e acolhedor para que nossos clientes possam alcançar seus objetivos de saúde e bem-estar.
        </p>
      </div>

      <div
        onClick={handleClickContateNos}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "40vh",
          gap: "2rem",
          background: "#ffffff",
          padding: "2rem",
          borderBottom: "1px solid #ddd",
          maxWidth: "800px",
          width: "100%",
          margin: "0 auto",
          borderRadius: "15px",
          boxShadow: clickedContateNos ? "0 8px 24px rgba(0, 0, 0, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
          transform: clickedContateNos ? "scale(1.05)" : "scale(1)",
          transition: "all 0.3s ease",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
            color: "#333",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Contate-nos
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "1rem" }}>
          Se você tiver alguma dúvida ou precisar de mais informações, não hesite em nos contatar. Estamos aqui para ajudar!
        </p>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Email: contato@empresa.com | Telefone: (11) 1234-5678
        </p>
      </div>

      <Footer />
    </div>
  );
}
