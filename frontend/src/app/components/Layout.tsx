// src/app/layout.tsx

import { Metadata } from "next";
import Header from "../components/Header"; // Importando o Header
import Footer from "../components/Footer"; // Importando o Footer

export const metadata: Metadata = {
  title: "Plataforma de Serviços",
  description: "Bem-vindo à nossa plataforma de serviços",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Garante que o footer fique no final mesmo com pouco conteúdo
        background: "#f0f0f0", // Fundo para toda a página
        overflowX: "hidden", // Desabilita o scroll lateral
      }}
    >
      <Header /> {/* Insere o Header no topo */}

      <main
        style={{
          flex: 1, // Permite que o conteúdo ocupe todo o espaço disponível
          padding: "2rem", // Espaçamento interno para o conteúdo
          backgroundColor: "#fff", // Fundo branco para o conteúdo
        }}
      >
        {children} {/* O conteúdo da página será inserido aqui */}
      </main>

      <Footer /> {/* Insere o Footer fixo no final */}
    </div>
  );
}
