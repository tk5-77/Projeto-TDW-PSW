"use client";


import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import API from "../services/api";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({ username: "", password: "" });
  const [error, setError] = React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trimStart() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se os campos estão preenchidos
    if (!formData.username || !formData.password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Chamada ao backend
      const res = await API.post("/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      console.log("Resposta do login:", res.data);

      // Armazena o token no localStorage
      localStorage.setItem("token", res.data.token);

      alert("Login bem-sucedido!");
      router.push("/");
  } catch (err) {
      if (axios.isAxiosError(err)) {
          // Tratamento para erros do Axios
          setError(err.response?.data?.message || "Erro ao realizar login. Tente novamente.");
      } else {
          // Tratamento para outros tipos de erro
          setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
  }
};

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          padding: "2rem",
          background: "#f0f0f0",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1.5rem", color: "#333", fontWeight: "bold", textTransform: "uppercase" }}>
          Página de Login
        </h1>

        {error && (
          <div style={{ color: "red", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

<form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
  <label style={{ display: "block", fontSize: "1.5rem", fontWeight: "bold" }}>
    Usuário:
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
      required
      placeholder="Digite seu usuário"
      style={{
        width: "100%",
        padding: "1rem",
        marginTop: "10px",
        borderRadius: "8px",
        border: "2px solid #ccc",
        fontSize: "1.2rem",
      }}
    />
  </label>

  <label style={{ display: "block", fontSize: "1.5rem", fontWeight: "bold", marginTop: "1rem" }}>
    Senha:
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      placeholder="Digite sua senha"
      style={{
        width: "100%",
        padding: "1rem",
        marginTop: "10px",
        borderRadius: "8px",
        border: "2px solid #ccc",
        fontSize: "1.2rem",
      }}
    />
  </label>

  <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
    <button
      type="submit"
      style={{
        padding: "1rem 2rem",
        fontSize: "1.5rem",
        backgroundColor: "#0070f3",
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
      Entrar
    </button>

    <button
      type="button"
      onClick={() => router.push("/register")}
      style={{
        padding: "1rem 2rem",
        fontSize: "1.5rem",
        backgroundColor: "#0070f3",
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
      Criar Conta
    </button>
  </div>
</form>

      </div>
      <Footer />
    </div>
  );
}
