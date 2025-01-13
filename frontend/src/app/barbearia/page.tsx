"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Importação do useRouter
import Header from "../components/Header";
import Footer from "../components/Footer";

const services = [
  { id: 1, name: "Corte de Cabelo", price: "15€" },
  { id: 2, name: "Barba", price: "10€" },
  { id: 3, name: "Corte + Barba", price: "20€" },
];

const hours = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export default function BarbeariaPage() {
  const router = useRouter(); // Inicializa o roteador
  const [formData, setFormData] = React.useState({ name: "", service: "", date: "", time: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    alert("Agendamento realizado com sucesso!");
  };

  // Função para validar o horário de agendamento (só entre 09:00 e 18:00)
  const isValidTime = (time: string) => {
    const validHours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
    return validHours.includes(time);
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        width: "100%", // Garante que a largura ocupa 100% da tela
        height: "100vh", // Garante que a altura ocupa 100% da altura da tela
        margin: 0, // Remove margens padrão
        overflowX: "hidden", // Desabilita o scroll lateral
      }}
    >
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
          borderBottom: "1px solid #ddd",
          width: "100%", // Garante que o conteúdo principal ocupe toda a largura
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
          Bem-vindo à Barbearia
        </h1>
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1.5rem",
            color: "#444",
            fontWeight: "bold",
          }}
        >
          Serviços Disponíveis
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: "0",
            fontSize: "1.5rem",
            color: "#333",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          {services.map((service) => (
            <li
              key={service.id}
              style={{
                marginBottom: "15px",
                fontWeight: "bold",
                fontSize: "1.8rem",
              }}
            >
              {service.name} - <span style={{ fontWeight: "normal", color: "#2d9cdb" }}>{service.price}</span>
            </li>
          ))}
        </ul>

        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1.5rem",
            color: "#444",
            fontWeight: "bold",
          }}
        >
          Agende o seu horário
        </h2>
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "600px" }}>
          <label style={{ display: "block", fontSize: "1.5rem", fontWeight: "bold" }}>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Seu nome"
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
            Serviço:
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "1rem",
                marginTop: "10px",
                borderRadius: "8px",
                border: "2px solid #ccc",
                fontSize: "1.2rem",
              }}
            >
              <option value="">Selecione um serviço</option>
              {services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "block", fontSize: "1.5rem", fontWeight: "bold", marginTop: "1rem" }}>
            Data:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
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
            Hora:
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "1rem",
                marginTop: "10px",
                borderRadius: "8px",
                border: "2px solid #ccc",
                fontSize: "1.2rem",
              }}
            >
              <option value="">Selecione uma hora</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </label>

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
              marginTop: "2rem",
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
            Agendar
          </button>
        </form>

        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            marginTop: "20px",
            padding: "15px 25px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            display: "inline-block",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#005bb5";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#0070f3";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Voltar à Página Inicial
        </button>
      </div>

      <Footer />
    </div>
  );
}
