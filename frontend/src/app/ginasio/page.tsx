"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Importação do useRouter
import Header from "../components/Header";
import Footer from "../components/Footer";

const services = [
  { id: 1, name: "Musculação", price: "25€" },
  { id: 2, name: "Aula de Yoga", price: "15€" },
  { id: 3, name: "Pilates", price: "20€" },
  { id: 4, name: "Aula de Spinning", price: "18€" },
];

const hours = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
];

export default function GinásioPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({ name: "", service: "", date: "", time: "" });
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedTime = formData.time;

    if (!hours.includes(selectedTime)) {
      setError("O horário de agendamento deve estar entre 9h e 18h.");
      return;
    }

    setError("");
    console.log("Dados enviados:", formData);
    alert("Agendamento realizado com sucesso!");
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
          borderBottom: "1px solid #ddd",
        }}
      >
        <h1 style={{
          fontSize: "3rem",
          marginBottom: "1.5rem",
          color: "#333",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}>
          Bem-vindo ao Ginásio
        </h1>

        <h2 style={{ fontSize: "2rem", color: "#444", fontWeight: "bold" }}>Serviços Disponíveis</h2>
        <ul style={{ listStyle: "none", padding: "0", fontSize: "1.5rem", color: "#333", textAlign: "center" }}>
          {services.map((service) => (
            <li key={service.id} style={{ marginBottom: "15px", fontWeight: "bold", fontSize: "1.8rem" }}>
              {service.name} - <span style={{ fontWeight: "normal", color: "#2d9cdb" }}>{service.price}</span>
            </li>
          ))}
        </ul>

        <h2 style={{ fontSize: "2rem", color: "#444", fontWeight: "bold" }}>Agende o seu horário</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "600px" }}>
          <label style={{ display: "block", fontSize: "1.5rem", fontWeight: "bold" }}>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name}
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
              <option value="">Selecione um horário</option>
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </label>

          {error && (
            <p style={{ color: "red", fontSize: "1.4rem", marginTop: "1rem", fontWeight: "bold" }}>
              {error}
            </p>
          )}

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
              marginTop: "2rem",
            }}
          >
            Agendar
          </button>
        </form>

        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            padding: "1rem 2rem",
            fontSize: "1.5rem",
            backgroundColor: "#666",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "2rem",
          }}
        >
          Voltar
        </button>
      </div>
      <Footer />
    </div>
  );
}
