"use client";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        padding: "2rem", // Aumentado o padding para um visual melhor
        width: "100%", // Faz o footer ocupar toda a largura
      }}
    >
      <p style={{ margin: 0, fontSize: "1.2rem" }}>
        © 2025 Plataforma de Serviços. Todos os direitos reservados.
      </p>
    </footer>
  );
}
