"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "../services/api";
import { useAuth } from "../AuthContext";
import Image from "next/image";

// Componente para os ícones de redes sociais
const SocialIcon = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
  >
    <span className="sr-only">{label}</span>
    {/* Substitua pelo ícone real desejado */}
    <div className="w-5 h-5 bg-gray-400"></div>
  </a>
);

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
        image,
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
      {/* Header */}
      <header className="bg-white shadow z-10">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Bookify</h1>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/AdminHomePage"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-24 px-8">
          <h2 className="text-5xl font-bold mb-12 text-center">Criar Entidade</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-10 rounded-xl shadow-lg"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
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
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-700"
              >
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
              <label
                htmlFor="image"
                className="block text-lg font-medium text-gray-700"
              >
                Imagem
              </label>
              <textarea
                id="image"
                value={image}
                onChange={(e) => setimage(e.target.value)}
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="location"
                className="block text-lg font-medium text-gray-700"
              >
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

      {/* Footer aprimorado */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Cinfães Fit & Barber
            </h3>
            <p className="text-sm">
              Elevando padrões de beleza e bem-estar desde 2023
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Cortes Premium
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Tratamentos Faciais
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Bem-Estar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>Rua da Elegância, 123</li>
              <li>contato@cinfaesfitbarber.pt</li>
              <li>+351 912 345 678</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Siga-nos</h4>
            <div className="flex space-x-4">
              <SocialIcon href="#" label="Facebook" />
              <SocialIcon href="#" label="Instagram" />
              <SocialIcon href="#" label="WhatsApp" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminCriarEntidade;
