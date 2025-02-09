"use client";//Admin pageeeeeeeeeeeeeeeeeeeeeee
import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import API from "../services/api";
import { useRouter } from 'next/navigation';

const EntityManagementPage: React.FC = () => {
  const [entities, setEntities] = useState([]);
  const [newEntity, setNewEntity] = useState({ name: "", location: "", description: "" });
  const [error, setError] = useState("");
  const authContext = useAuth();
  if (!authContext) {
    return <p className="text-red-500 text-center mt-4">Authentication context is not available.</p>;
  }

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    try {
      const response = await fetch("/api/entities", {
        method: "GET",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch entities");
      }
      const data = await response.json();
      setEntities(data);
    } catch (error) {
      console.error("Failed to fetch entities", error);
      setError("Failed to fetch entities");
    }
  };

  const handleAddEntity = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/entities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newEntity),
      });
      if (!response.ok) {
        throw new Error("Failed to add entity");
      }
      fetchEntities();
      setNewEntity({ name: "", location: "", description: "" });
    } catch (error) {
      console.error("Failed to add entity", error);
      setError("Failed to add entity");
    }
  };

  return (
    <div className="entity-management">
      <h1>Entity Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleAddEntity}>
        <input
          type="text"
          placeholder="Entity Name"
          value={newEntity.name}
          onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newEntity.location}
          onChange={(e) => setNewEntity({ ...newEntity, location: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newEntity.description}
          onChange={(e) => setNewEntity({ ...newEntity, description: e.target.value })}
        />
        <button type="submit">Add Entity</button>
      </form>

      <h2>Entities</h2>
      <ul>
        {entities.map((entity: any) => (
          <li key={entity._id}>
            <h3>{entity.name}</h3>
            <p>{entity.location}</p>
            <p>{entity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntityManagementPage;