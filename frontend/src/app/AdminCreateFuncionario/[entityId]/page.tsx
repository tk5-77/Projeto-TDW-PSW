"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import { useAuth } from "../../AuthContext";
import Link from "next/link";

// Componente para os ícones de redes sociais
const SocialIcon: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a
    href={href}
    className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
  >
    <span className="sr-only">{label}</span>
    {/* Substitua pelo ícone real desejado */}
    <div className="w-5 h-5 bg-gray-400"></div>
  </a>
);

const CreateUserPage: React.FC = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user_entity",
    entity: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const authContext = useAuth();

  if (!authContext) {
    return (
      <p className="text-red-500 text-center mt-4">
        Authentication context is not available.
      </p>
    );
  }

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", {
        ...user,
        entity: authContext.user?.entity,
      });
      router.push("/AdminHomePage");
    } catch (error) {
      console.error("Failed to create user", error);
      setError("Failed to create user");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white border-b py-4 px-6 flex justify-between items-center">
        <h1 className="text-blue-600 text-2xl font-bold">
          Bookify
        </h1>
        <nav className="space-x-4">
          <Link href="/AdminHomePage" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
        </nav>
      </header>

      <div className="w-full h-12"></div>

      {/* Conteúdo principal */}
      <div className="flex flex-col items-center justify-center flex-grow mb-20">
        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Criar Funcionario
          </h2>
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <form onSubmit={handleCreateUser} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                value={user.username}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition-all"
            >
              Criar Funcionario
            </button>
          </form>
        </div>
      </div>

      {/* Footer aprimorado */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Bookify
            </h3>
            <p className="text-sm">
              Elevando padrões de beleza e bem-estar desde 2023
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Cortes Premium
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Tratamentos Faciais
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Bem-Estar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>Bairro da Tapada, 241</li>
              <li>contato@Bookify.pt</li>
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

export default CreateUserPage;
