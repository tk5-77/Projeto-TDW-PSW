"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import API from "../services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Service {
  _id: string;
  type: string;
  capacity: number;
  publicDescription: string;
  duration: number;
}

const SocialIcon: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a
    href={href}
    className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
  >
    <span className="sr-only">{label}</span>
    <div className="w-5 h-5 bg-gray-400"></div>
  </a>
);

const FuncionarioServicosPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const authContext = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      if (!authContext?.user) return;
      try {
        const entityId = authContext.user.entity;
        const response = await API.get(`/services/entity/${entityId}`);
        setServices(response.data);
      } catch (err) {
        console.error("Erro ao buscar serviços", err);
        setError("Erro ao carregar serviços");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [authContext?.user]);

  // Função placeholder para o delete (será implementada futuramente)
  const handleDeleteService = async (serviceId: string) => {
    console.log("Deleting service with ID:", serviceId);
     //TODO: Implementar lógica de delete
     try {
       await API.delete(`/services/${serviceId}/slots/${serviceId}}`);
       setServices(services.filter(service => service._id !== serviceId));
     } catch (error) {
      console.error("Erro ao deletar serviço", error);
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
          <Link href="/FuncionarioHomePage" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
        </nav>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Serviços Ativos</h1>
          <p className="text-gray-600 mt-2">Gerencie os serviços disponíveis em sua unidade</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando serviços...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md mx-auto">
            {error}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">Nenhum serviço cadastrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{service.type}</h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {service.capacity} vagas
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{service.publicDescription}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <span>⏳ Duração:</span>
                      <span className="ml-1 font-medium">{service.duration} min</span>
                    </div>
                    <button 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                      onClick={() => { router.push(`/FuncionarioGerirReserva/${service._id}`) }}
                    >
                      Gerenciar →
                    </button>
                  </div>
                </div>

                {/* Botão de Delete */}
                <div className="border-t p-4 bg-gray-50">
                  <button
                    onClick={() => handleDeleteService(service._id)}
                    className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-800 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Remover Serviço</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Bookify</h3>
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

export default FuncionarioServicosPage;