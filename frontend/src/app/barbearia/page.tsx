"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Importação do useRouter
import Header from "../components/Header";
import Footer from "../components/Footer";

const services = [
  { id: 1, name: "Corte de Cabelo", price: "15€", description: "Corte profissional com acabamento perfeito." },
  { id: 2, name: "Barba", price: "10€", description: "Modelagem e alinhamento da barba." },
  { id: 3, name: "Corte + Barba", price: "20€", description: "Pacote completo de corte de cabelo e barba." },
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

        <table
          style={{
            width: "100%",
            maxWidth: "800px",
            borderCollapse: "collapse",
            marginBottom: "2rem",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#ddd", textAlign: "left" }}>
              <th style={{ padding: "10px", fontSize: "1.5rem" }}>Nome</th>
              <th style={{ padding: "10px", fontSize: "1.5rem" }}>Preço</th>
              <th style={{ padding: "10px", fontSize: "1.5rem" }}>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "10px", fontSize: "1.2rem" }}>{service.name}</td>
                <td style={{ padding: "10px", fontSize: "1.2rem", color: "#2d9cdb" }}>{service.price}</td>
                <td style={{ padding: "10px", fontSize: "1.2rem" }}>{service.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          {services.map((service) => (
            <div key={service.id} style={{ textAlign: "center" }}>
              <img
                src={`/images/${service.name.toLowerCase().replace(" ", "-")}.jpg`}
                alt={service.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>{service.name}</p>
            </div>
          ))}
        </div>

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
            transition: "background 0.3s ease, transform 0.3s ease",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginTop: "1rem",
          }}
        >
          Voltar ao Menu Principal
        </button>
      </div>
      <Footer />
    </div>
  );
}
