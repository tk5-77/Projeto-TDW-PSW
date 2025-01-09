"use client";

export default function Footer() {
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
      <p style={{ margin: 0, fontSize: "1.5rem" }}> {/* Aumentado o tamanho da fonte */}
        © 2025 Cinfães Fit & Barber. Todos os direitos reservados.
      </p>
    </footer>
  );
}
