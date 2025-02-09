"use client";

import React, { useState, useEffect } from "react";

const GestaodeTurnos: React.FC = () => {
  const [turnos, setTurnos] = useState([]);
  const [newTurno, setNewTurno] = useState({
    serviceId: "",
    startTime: "",
    endTime: "",
    capacity: "",
  });

  useEffect(() => {
    fetchTurnos();
  }, []);

  const fetchTurnos = async () => {
    try {
      const response = await fetch("/api/turnos", {
        method: "GET",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setTurnos(data);
    } catch (error) {
      console.error("Failed to fetch turnos", error);
    }
  };

  const handleAddTurno = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/turnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newTurno),
      });
      if (response.ok) {
        fetchTurnos();
        setNewTurno({ serviceId: "", startTime: "", endTime: "", capacity: "" });
      }
    } catch (error) {
      console.error("Failed to add turno", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Gestão de Agendamentos</h1>

      <form onSubmit={handleAddTurno} className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ID do Serviço"
            value={newTurno.serviceId}
            onChange={(e) => setNewTurno({ ...newTurno, serviceId: e.target.value })}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="datetime-local"
            placeholder="Início"
            value={newTurno.startTime}
            onChange={(e) => setNewTurno({ ...newTurno, startTime: e.target.value })}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="datetime-local"
            placeholder="Fim"
            value={newTurno.endTime}
            onChange={(e) => setNewTurno({ ...newTurno, endTime: e.target.value })}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Capacidade"
            value={newTurno.capacity}
            onChange={(e) => setNewTurno({ ...newTurno, capacity: e.target.value })}
            required
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Adicionar Turno
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Lista de Agendamentos</h2>
      <ul className="space-y-4">
        {turnos.map((turno: any) => (
          <li key={turno._id} className="p-4 border rounded-lg shadow-md">
            <p className="text-gray-700"><strong>Serviço:</strong> {turno.serviceId}</p>
            <p className="text-gray-700"><strong>Início:</strong> {new Date(turno.startTime).toLocaleString()}</p>
            <p className="text-gray-700"><strong>Fim:</strong> {new Date(turno.endTime).toLocaleString()}</p>
            <p className="text-gray-700"><strong>Capacidade:</strong> {turno.capacity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestaodeTurnos;
