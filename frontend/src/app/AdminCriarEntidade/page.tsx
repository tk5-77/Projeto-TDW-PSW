"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "../services/api";
import { useAuth } from "../AuthContext";
import Image from "next/image";

const AdminCriarEntidade: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setlocation] = useState("");
  const [image, setimage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const authContext = useAuth();
  const router = useRouter();

  if (!authContext) {
    return (
      <p className="text-red-500 text-center mt-4">
        Authentication context is not available.
      </p>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post("/entities", {
        name,
        description,
        location,
        image
      });
      if (response.status !== 201) {
        throw new Error("Failed to create entity");
      }
      setSuccess("Entity created successfully");
      setName("");
      setDescription("");
      setlocation("");
      setimage("");
      router.push("/AdminCriarservico/" + response.data._id); // Redireciona para a página de criar serviço
    } catch (error) {
      setError("Failed to create entity");
    }
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <header className="bg-white shadow z-10">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Cinfães Fit & Barber
            </h1>
          </div>
          <div className="flex space-x-6">
            <Link href="/AdminHomePage" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
              Login
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-24 px-8">
          <h2 className="text-5xl font-bold mb-12 text-center">Criar Entidade</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-10 rounded-xl shadow-lg">
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Nome da Entidade
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-lg font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="Image" className="block text-lg font-medium text-gray-700">
                Image
              </label>
              <textarea
                id="Image"
                value={image}
                onChange={(e) => setimage(e.target.value)}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="location" className="block text-lg font-medium text-gray-700">
                Localização
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Criar Entidade
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-white border-t py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm text-gray-700">
              © 2025 Cinfães Fit & Barber. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
              Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminCriarEntidade;