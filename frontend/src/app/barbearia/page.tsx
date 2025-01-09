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

export default function BarbeariaPage() {
  const router = useRouter(); // Inicializa o roteador
  const [formData, setFormData] = React.useState({ name: "", service: "", date: "" });

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
    <div className="container">
      <Header />
      <h1>Bem-vindo à Barbearia</h1>
      <h2>Serviços Disponíveis</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name} - <span>{service.price}</span>
          </li>
        ))}
      </ul>

      <h2>Agende o seu horário</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Seu nome"
          />
        </label>
        <br />
        <label>
          Serviço:
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um serviço</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Data:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Agendar</button>
      </form>

      {/* Botão de Voltar à Página Inicial */}
      <button
        type="button"
        onClick={() => router.push("/")}
        style={{
          marginTop: "20px",
          padding: "15px 25px",
          backgroundColor: "#2d9cdb",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        Voltar à Página Inicial
      </button>

      <Footer />
      <style jsx>{`
        .container {
          font-family: "Arial", sans-serif;
          padding: 20px;
          background-color: #f4f4f9;
          max-width: 800px;
          margin: 0 auto;
        }

        h1 {
          font-size: 32px;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }

        h2 {
          font-size: 28px;
          color: #444;
          margin-bottom: 15px;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          margin-bottom: 15px;
          font-size: 20px;
        }

        span {
          font-weight: bold;
          color: #2d9cdb;
        }

        label {
          display: block;
          margin-bottom: 15px;
          font-size: 20px;
          font-weight: bold;
        }

        input,
        select {
          width: 100%;
          padding: 15px;
          margin-top: 10px;
          border-radius: 8px;
          border: 2px solid #ccc;
          box-sizing: border-box;
          font-size: 18px;
        }

        input::placeholder {
          color: #aaa;
          font-size: 16px;
        }

        button {
          font-size: 20px;
          padding: 15px 30px;
        }

        button:hover {
          background-color: #1e80b6;
        }
      `}</style>
    </div>
  );
}
