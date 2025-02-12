"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../services/api";
import Link from "next/link";
import { FiSettings, FiUsers, FiCalendar, FiArrowUpRight ,  FiInstagram, 
    FiLinkedin  } from "react-icons/fi";

interface Entity {
  _id: string;
  name: string;
  description: string;
  totalServices?: number;
  activeClients?: number;
}

const AdminEntityPage = () => {
  const router = useRouter();
  const [entity, setEntity] = useState<Entity | null>(null);

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await API.get(`/entities/getAdminEntities`);
        setEntity({ 
          ...response.data,
          totalServices: 24, // Dados mockados para demonstração
          activeClients: 158
        });
      } catch (error) {
        console.error("Erro ao buscar entidade:", error);
      }
    };
    fetchEntity();
  }, []);

  const handleGoToServices = () => {
    router.push(`/AdminDashboardServices/${entity?._id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header Minimalista */}
      <header className="w-full bg-white border-b border-neutral-200 py-4 px-8 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold text-neutral-900">
            <span className="text-blue-600">Bookify</span> Admin
          </Link>
          <nav className="space-x-6">
            <Link href="/AdminHomePage" className="text-neutral-600 hover:text-blue-600 transition-colors">
              Visão Geral
            </Link>
            <Link href="/settings" className="text-neutral-600 hover:text-blue-600 transition-colors">
              Configurações
            </Link>
            <Link href="/support" className="text-neutral-600 hover:text-blue-600 transition-colors">
              Suporte
            </Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow mt-16 mb-8">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Cabeçalho da Entidade */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-semibold text-neutral-900">{entity?.name || 'Carregando...'}</h1>
              <button 
                onClick={handleGoToServices}
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                GerirServiços
                <FiArrowUpRight className="ml-2" />
              </button>
            </div>
            <p className="text-neutral-600 max-w-3xl leading-relaxed">
              {entity?.description || 'A carregar descrição...'}
            </p>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FiSettings className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Serviços Ativos</p>
                  <p className="text-2xl font-semibold">{entity?.totalServices || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-neutral-200">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FiUsers className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Clientes Ativos</p>
                  <p className="text-2xl font-semibold">{entity?.activeClients || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pré-visualização de Serviços */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Serviços Recentes</h3>
              <button className="text-blue-600 hover:text-blue-700 flex items-center">
                Ver Todos <FiArrowUpRight className="ml-1" />
              </button>
            </div>
            <div className="grid gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 hover:bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-medium">Corte Masculino Premium</p>
                    <p className="text-sm text-neutral-500">Duração: 45min • Preço: €25</p>
                  </div>
                  <FiCalendar className="text-neutral-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Profissional */}
      <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Bookify Admin</h4>
              <p className="text-sm">Gestão profissional de serviços de beleza e bem-estar</p>
            </div>
            <div>
              <h5 className="text-white font-medium mb-4">Recursos</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Serviço</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-medium mb-4">Suporte</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contactar Suporte</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status do Sistema</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-medium mb-4">Contactos</h5>
              <div className="space-y-2 text-sm">
                <p>suporte@bookify.com</p>
                <p>+351 123 456 789</p>
                <div className="flex space-x-4 mt-2">
                  <a href="#" className="text-neutral-400 hover:text-white">
                    <FiInstagram />
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-white">
                    <FiLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm">
            <p>© 2025 Bookify. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminEntityPage;