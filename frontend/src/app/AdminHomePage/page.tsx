"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "../services/api"; // Ajuste o caminho conforme sua estrutura
import { useAuth } from "../AuthContext";

// Componente SocialIcon para os ícones de redes sociais
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

export default function AdminHome() {
  const router = useRouter();
  const authContext = useAuth();

  // Função para redirecionar para o Dashboard de Entidades
  const handleDashboardEntities = async () => {
    router.push(`/AdminDashboardEntidades`);
  };

  // Função para redirecionar para a página de criação de Funcionários
  const handleCreateFuncionarios = async () => {
    router.push("/AdminCreateFuncionario/" + authContext?.user?.entity);
  };

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow z-10">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Bookify
            </h1>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/"
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

      {/* Seção de destaque / Hero */}
      <section className="relative w-full bg-blue-600 text-white text-center py-32">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="text-6xl font-bold leading-tight">
            Painel do Administrador
          </h1>
          <p className="text-2xl mt-4">
            Gerencie sua plataforma com facilidade
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/AdminCriarEntidade">
              <span className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 transition-all cursor-pointer">
                Criar Entidade
              </span>
            </Link>
            <button
              onClick={handleDashboardEntities}
              className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 transition-all cursor-pointer"
            >
              Dashboard Entidades
            </button>
            <button onClick={handleCreateFuncionarios}>
              <span className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 transition-all cursor-pointer">
                Criar Funcionário
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Conteúdo principal */}
      <section className="max-w-7xl mx-auto py-24 px-8 text-center">
        <h2 className="text-5xl font-bold mb-12">O que você pode gerenciar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-3xl font-semibold mb-4">Usuários</h3>
            <p className="text-lg text-gray-700">
              Crie, edite e remova usuários da plataforma.
            </p>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-3xl font-semibold mb-4">Serviços</h3>
            <p className="text-lg text-gray-700">
              Adicione e configure serviços disponíveis.
            </p>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-3xl font-semibold mb-4">Agendamentos</h3>
            <p className="text-lg text-gray-700">
              Gerencie e monitore os agendamentos dos usuários.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Bookify
            </h3>
            <p className="text-sm">
              Elevando padrões de beleza e bem-estar desde 2025
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
              <li>Bairro da Tapada, 241</li>
              <li>contato@bookify.pt</li>
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
}
