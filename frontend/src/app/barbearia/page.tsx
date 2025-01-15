/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

const services = [
  { id: 1, name: "Corte de Cabelo", price: "15€", description: "Corte profissional com acabamento perfeito." },
  { id: 2, name: "Barba", price: "10€", description: "Modelagem e alinhamento da barba." },
  { id: 3, name: "Corte + Barba", price: "20€", description: "Pacote completo de corte de cabelo e barba." },
];

// Cria os horários de meia em meia hora (das 9h até 17h30, por exemplo)
const halfHourSlots = [
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00", "14:00", 
  "14:30","15:00", 
  "15:30","16:00",
  "16:30","17:00", 
  "17:30",
];

// Cada objeto terá a estrutura { time: string, isAvailable: boolean }
const initialSlots = halfHourSlots.map((time) => ({
  time,
  isAvailable: true,
}));

export default function BarbeariaPage() {
  const router = useRouter();

  // Estado que controla as vagas (mapa de vagas)
  const [slots, setSlots] = React.useState(initialSlots);

  // Estado do formulário
  const [formData, setFormData] = React.useState({
    name: "",
    service: "",
    date: "",
    time: "",
  });

  // Lida com mudanças nos campos de input/select
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Lida com envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Se não houver serviço, data ou hora selecionados, parar aqui
    if (!formData.name || !formData.service || !formData.date || !formData.time) {
      alert("Por favor, preencha todos os campos antes de agendar.");
      return;
    }

    // Atualiza a disponibilidade do horário selecionado
    setSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.time === formData.time ? { ...slot, isAvailable: false } : slot
      )
    );

    console.log("Dados enviados:", formData);
    alert(`Agendamento realizado com sucesso!\nHorário: ${formData.time}`);

    // (Opcional) Resetar o formulário
    setFormData({ name: "", service: "", date: "", time: "" });
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        width: "100%",
        height: "100vh",
        margin: 0,
        overflowX: "hidden",
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
          width: "100%",
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
                <td style={{ padding: "10px", fontSize: "1.2rem" }}>
                  {service.name}
                </td>
                <td style={{ padding: "10px", fontSize: "1.2rem", color: "#2d9cdb" }}>
                  {service.price}
                </td>
                <td style={{ padding: "10px", fontSize: "1.2rem" }}>
                  {service.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mapa de Vagas (Disponível / Indisponível) */}
        <h3
          style={{
            fontSize: "1.8rem",
            color: "#333",
            marginBottom: "1rem",
          }}
        >
          Mapa de Vagas
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          {slots.map((slot) => (
            <div
              key={slot.time}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "0.5rem 1rem",
                backgroundColor: slot.isAvailable ? "#d1ffd1" : "#ffd1d1",
                minWidth: "80px",
                textAlign: "center",
              }}
            >
              <strong>{slot.time}</strong>
              <br />
              {slot.isAvailable ? "Disponível" : "Indisponível"}
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
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <label
            style={{ display: "block", fontSize: "1.5rem", fontWeight: "bold" }}
          >
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

          <label
            style={{
              display: "block",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
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

          <label
            style={{
              display: "block",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
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

          <label
            style={{
              display: "block",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
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
              {slots.map((slot) =>
                slot.isAvailable ? (
                  <option key={slot.time} value={slot.time}>
                    {slot.time}
                  </option>
                ) : null
              )}
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
