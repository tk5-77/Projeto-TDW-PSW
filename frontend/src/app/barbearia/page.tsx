"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
// IMPORT do cliente de API (Axios)
import API from "../services/api";

// Criamos 2 grupos de horários para o Accordion:
// (Manhã) e (Tarde)
const manhaSlots = [
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00"
];

const tardeSlots = [
  "14:00", "14:30",
  "15:00", "15:30",
  "16:00", "16:30",
  "17:00", "17:30",
];

// Função utilitária para transformar array de strings em
// [{ time: "09:00", isAvailable: true }, ...]
function createSlotObjects(times: string[]) {
  return times.map((time) => ({
    time,
    isAvailable: true,
  }));
}

// Agrupa todos os slots em um objeto
const initialMapa = {
  manha: createSlotObjects(manhaSlots),
  tarde: createSlotObjects(tardeSlots),
};

export default function BarbeariaPage() {
  const router = useRouter();

  // Estado geral do formulário
  const [formData, setFormData] = React.useState({
    name: "",
    service: "",
    date: "",
    time: "",
  });

  // Estado que controla o "mapa de vagas" em formato de objeto
  // {
  //   manha: [ { time: "09:00", isAvailable: true }, ... ],
  //   tarde: [ { time: "14:00", isAvailable: true }, ... ]
  // }
  const [mapa, setMapa] = React.useState(initialMapa);

  // Estado que controla qual "Accordion" está aberto:
  // manha ou tarde (ou nenhum)
  const [openAccordion, setOpenAccordion] = React.useState<string | null>(null);

  // Mock de serviços
  const services = [
    { id: 1, name: "Corte de Cabelo", price: "15€", description: "Corte profissional com acabamento perfeito." },
    { id: 2, name: "Barba", price: "10€", description: "Modelagem e alinhamento da barba." },
    { id: 3, name: "Corte + Barba", price: "20€", description: "Pacote completo de corte de cabelo e barba." },
  ];

  // Lida com mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Abre/fecha cada accordion
  const toggleAccordion = (section: string) => {
    // se clicar na mesma, fecha
    if (openAccordion === section) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(section);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.service || !formData.date || !formData.time) {
      alert("Por favor, preencha todos os campos antes de agendar.");
      return;
    }

    try {
      // Supondo que sua rota seja /bookings
      const res = await API.post("/bookings", formData);

      console.log("Dados enviados ao backend:", res.data);
      alert(`Agendamento realizado com sucesso!\nHorário: ${formData.time}`);

      // Marca localmente o slot como indisponível
      // Precisamos achar a secção (manha / tarde) que contém esse "time"
      const slotTime = formData.time; // ex: "09:00"
      let sectionFound: "manha" | "tarde" | null = null;

      // Verifica se está em manha
      if (mapa.manha.some((s) => s.time === slotTime)) {
        sectionFound = "manha";
      } else if (mapa.tarde.some((s) => s.time === slotTime)) {
        sectionFound = "tarde";
      }

      if (sectionFound) {
        setMapa((prev) => {
          const updatedSection = prev[sectionFound!].map((slot) =>
            slot.time === slotTime
              ? { ...slot, isAvailable: false }
              : slot
          );
          return {
            ...prev,
            [sectionFound!]: updatedSection,
          };
        });
      }

      // Reset do formulário
      setFormData({ name: "", service: "", date: "", time: "" });
    } catch (err) {
      console.error("Erro ao enviar ao backend:", err);
      alert("Ocorreu um erro ao agendar. Tente novamente mais tarde.");
    }
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
                <td style={{ padding: "10px", fontSize: "1.2rem" }}>{service.name}</td>
                <td style={{ padding: "10px", fontSize: "1.2rem", color: "#2d9cdb" }}>{service.price}</td>
                <td style={{ padding: "10px", fontSize: "1.2rem" }}>{service.description}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Accordion - Mapa de Vagas */}
        <h3
          style={{
            fontSize: "1.8rem",
            color: "#333",
            marginBottom: "1rem",
          }}
        >
          Vagas
        </h3>

        {/* Accordion Section - Manhã */}
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            marginBottom: "1rem",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <button
            onClick={() => toggleAccordion("manha")}
            style={{
              width: "100%",
              backgroundColor: "#0070f3",
              color: "#fff",
              textAlign: "left",
              padding: "1rem",
              fontSize: "1.2rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Manhã
          </button>
          {openAccordion === "manha" && (
            <div style={{ backgroundColor: "#fff", padding: "1rem" }}>
              {mapa.manha.map((slot) => (
                <div
                  key={slot.time}
                  style={{
                    marginBottom: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "0.5rem",
                    backgroundColor: slot.isAvailable ? "#d1ffd1" : "#ffd1d1",
                  }}
                >
                  <strong>{slot.time}</strong> -{" "}
                  {slot.isAvailable ? "Disponível" : "Indisponível"}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accordion Section - Tarde */}
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            marginBottom: "2rem",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <button
            onClick={() => toggleAccordion("tarde")}
            style={{
              width: "100%",
              backgroundColor: "#0070f3",
              color: "#fff",
              textAlign: "left",
              padding: "1rem",
              fontSize: "1.2rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Tarde
          </button>
          {openAccordion === "tarde" && (
            <div style={{ backgroundColor: "#fff", padding: "1rem" }}>
              {mapa.tarde.map((slot) => (
                <div
                  key={slot.time}
                  style={{
                    marginBottom: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "0.5rem",
                    backgroundColor: slot.isAvailable ? "#d1ffd1" : "#ffd1d1",
                  }}
                >
                  <strong>{slot.time}</strong> -{" "}
                  {slot.isAvailable ? "Disponível" : "Indisponível"}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Formulário de Agendamento */}
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
              {/* 
                Faremos um "map" geral: junta manha + tarde
                e filtra os que estão disponíveis 
              */}
              {[...mapa.manha, ...mapa.tarde]
                .filter((slot) => slot.isAvailable)
                .map((slot) => (
                  <option key={slot.time} value={slot.time}>
                    {slot.time}
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
