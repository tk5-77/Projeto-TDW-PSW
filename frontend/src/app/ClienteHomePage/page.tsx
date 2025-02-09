"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "../services/api";
import { useAuth } from "../AuthContext";

export default function AdminHome() {
  const router = useRouter();
  const authContext = useAuth();
  const [entities, setEntities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEntities = async () => {
    try {
      const response = await API.get('/entities', {
        params: {
          page: currentPage,
          limit: 6,
          search: searchTerm,
        }
      });
      setEntities(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Erro ao buscar entidades:', error);
    }
  };

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    fetchEntities();
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, [currentPage, searchTerm]);

  const handleCreateFuncionarios = async () => {
    router.push("/AdminCreateFuncionario/" + authContext?.user?.entity);
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow z-10">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Cinfães Fit & Barber
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
            Painel do Cliente
          </h1>
          <p className="text-2xl mt-4">Gerencie sua plataforma com facilidade</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={handleCreateFuncionarios}>
              <span className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 transition-all cursor-pointer">
                Criar Funcionário
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Seção de Entidades com Paginação */}
      <section className="max-w-7xl mx-auto py-12 px-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Pesquisar entidades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entities.map((entity) => (
            <div key={entity._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold mb-2">{entity.name}</h3>
              <p className="text-gray-600 mb-4">{entity.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {entity.services?.length} serviços disponíveis
                </span>
                <Link 
                  href={`/GestaodeEntidade/${entity._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Gerenciar
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Controles de Paginação */}
        <div className="mt-12 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Anterior
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Próximo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-700">
              © 2025 Cinfães Fit & Barber. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
              Login
            </Link>
            <Link href="/AdminCriarEntidade" className="text-gray-700 hover:text-blue-600 transition">
              Criar Entidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}