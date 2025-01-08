"use client"
import React from "react";
import Header from "../components/Header"
import Footer from "../components/Footer"

const services = [
  { id: 1, name: "Treino Individual", price: "25€" },
  { id: 2, name: "Aula de Grupo", price: "10€" },
  { id: 3, name: "Plano Personalizado", price: "40€" },
];

export default function GymPage() {
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
      <Header /> {/* Usando o Header */}

      <h1>Bem-vindo ao Ginásio</h1>
      
      {/* Serviços Disponíveis */}
      <section className="services-section">
        <h2>Serviços Disponíveis</h2>
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              {service.name} - <span>{service.price}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Agendamento */}
      <section className="form-section">
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
      </section>

      <Footer /> {/* Usando o Footer */}

      <style jsx>{`
        .container {
          font-family: 'Arial', sans-serif;
          padding: 20px;
          background-color: #f4f4f9;
          max-width: 800px;
          margin: 0 auto;
        }

        h1 {
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }

        h2 {
          color: #444;
          margin-bottom: 10px;
        }

        .services-section, .form-section {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          margin-bottom: 10px;
          font-size: 16px;
        }

        span {
          font-weight: bold;
          color: #2d9cdb;
        }

        label {
          display: block;
          margin-bottom: 10px;
          font-weight: bold;
        }

        input, select {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
          box-sizing: border-box;
        }

        input::placeholder {
          color: #aaa;
        }

        button {
          background-color: #2d9cdb;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
        }

        button:hover {
          background-color: #1e80b6;
        }
      `}</style>
    </div>
  );
}
