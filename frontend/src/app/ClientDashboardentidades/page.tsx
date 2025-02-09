"use client";

import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useRouter } from "next/navigation";

interface Entity {
  _id: string;
  name: string;
  location: string;
  description?: string;
  image?: string;
}

export default function ClientDashboard() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchEntities() {
      try {
        const response = await API.get("/entities");
        setEntities(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar entidades:", error);
        setIsLoading(false);
      }
    }
    fetchEntities();
  }, []);

  const filteredEntities = entities.filter((entity) =>
    entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEntities = filteredEntities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEntities.length / itemsPerPage);

  const handleEntityClick = (entityId: string) => {
    router.push(`/ClientDashboardServices/${entityId}`);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Cinfães Fit & Barber
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <a 
                  href="/ClienteHomePage" 
                  className="relative group text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </a>
                <a 
                  href="#contact" 
                  className="relative group text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Logout
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Encontre a sua Empresa</span>
              <span className="block text-blue-600 mt-2">Ideal</span>
            </h1>
            <p className="mt-4 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              Descubra os melhores serviços perto de você
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg 
                    className="h-6 w-6 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 17.5a7.5 7.5 0 006.15-3.35z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Pesquisar por nome ou localização..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-6 py-3 text-base 
                           bg-white rounded-lg border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 placeholder-gray-400
                           shadow-sm transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Listagem de Entidades */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(itemsPerPage)].map((_, index) => (
              <div key={index} className="h-80 bg-white animate-pulse rounded-2xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentEntities.map((entity) => (
                <div
                  key={entity._id}
                  onClick={() => handleEntityClick(entity._id)}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-2"
                >
                  <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
                    {entity.image ? (
                      <img
                        src={entity.image}
                        alt={entity.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="text-gray-400">Sem imagem</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{entity.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {entity.location}
                    </div>
                    {entity.description && (
                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {entity.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center space-x-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>
                
                <span className="text-gray-600">
                  Página <span className="font-semibold">{currentPage}</span> de <span className="font-semibold">{totalPages}</span>
                </span>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}

        {!isLoading && filteredEntities.length === 0 && (
          <div className="text-center py-24">
            <div className="inline-block p-8 bg-white rounded-2xl shadow-lg">
              <p className="text-gray-500 text-xl mb-4">Nenhuma entidade encontrada</p>
              <p className="text-gray-400">Tente ajustar sua pesquisa ou filtros</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Cinfães Fit & Barber</h3>
              <p className="text-sm text-gray-500">Transformando sua experiência em cuidados pessoais desde 2023</p>
            </div>
            {/* Outras seções do footer... */}
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-500">
            © 2024 Cinfães Fit & Barber. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}