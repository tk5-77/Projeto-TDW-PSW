"use client";
import React, { useState, useEffect } from "react";////////////////User entity ou funcionario gere a reserva
import { useAuth } from "../AuthContext";
import API from "../services/api";

const SlotsManagementPage: React.FC = () => {
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ service: "", startTime: "", endTime: "", capacity: 0 });
  const [error, setError] = useState("");
  const authContext = useAuth();
  if (!authContext) {
    return <p className="text-red-500 text-center mt-4">Authentication context is not available.</p>;
  }

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await API.get("/slots");
      setSlots(response.data);
    } catch (error) {
      console.error("Failed to fetch slots", error);
      setError("Failed to fetch slots");
    }
  };

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post("/slots", newSlot);
      fetchSlots();
      setNewSlot({ service: "", startTime: "", endTime: "", capacity: 0 });
    } catch (error) {
      console.error("Failed to add slot", error);
      setError("Failed to add slot");
    }
  };

  const handleDeleteSlot = async (id: string) => {
    try {
      await API.delete(`/api/slots/${id}`);
      fetchSlots();
    } catch (error) {
      console.error("Failed to delete slot", error);
      setError("Failed to delete slot");
    }
  };

  return (
    <div className="slots-management">
      <h1>Slots Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleAddSlot}>
        <input
          type="text"
          placeholder="Service ID"
          value={newSlot.service}
          onChange={(e) => setNewSlot({ ...newSlot, service: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          placeholder="Start Time"
          value={newSlot.startTime}
          onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          placeholder="End Time"
          value={newSlot.endTime}
          onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newSlot.capacity}
          onChange={(e) => setNewSlot({ ...newSlot, capacity: parseInt(e.target.value) })}
          required
        />
        <button type="submit">Add Slot</button>
      </form>

      <h2>Slots</h2>
      <ul>
        {slots.map((slot: any) => (
          <li key={slot._id}>
            <h3>{new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}</h3>
            <p>Capacity: {slot.capacity}</p>
            <button onClick={() => handleDeleteSlot(slot._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )};


export default SlotsManagementPage;