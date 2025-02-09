"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import API from '../../services/api';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Service {
  _id: string;
  type: string;
  duration: number;
  Capacity: number;
  publicDescription: string;
  maxWeeklyBookings: number;
  isActive: boolean;
}
interface slots{
  startTime: Date,
   endTime: Date,
  capacity: Number,
  bookedCount: Number
}


const AdminServicesPage = () => {
  const params = useParams();
  const router = useRouter();
  const { entityId } = params as { entityId: string };
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await API.get(`/entities/${entityId}/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      }
    };

    if (entityId) fetchServices();
  }, [entityId]);

  const handleDelete = async (serviceId: string) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await API.delete(`/services/${serviceId}`);
        setServices(services.filter(service => service._id !== serviceId));
      } catch (error) {
        console.error("Erro ao excluir serviço:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-gray-800 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Painel de Administração</h1>
          <div className="flex items-center space-x-4">
            <Link 
              href="/AdminHomePage" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Admin Home
            </Link>
            <Link 
              href="/login" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Action Bar */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Serviços</h2>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            onClick={() => router.push(`/AdminCriarservico/${entityId}`)}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Novo Serviço
          </button>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{services.length}</div>
            <div className="text-gray-600">Serviços Totais</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {services.filter(s => s.isActive).length}
            </div>
            <div className="text-gray-600">Serviços Ativos</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">
              {services.reduce((acc, curr) => acc + curr.maxWeeklyBookings, 0)}
            </div>
            <div className="text-gray-600">Reservas/Semana</div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
            >
              <div className="p-6">
                {/* Service Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.type}</h3>
                    <p className="text-sm text-gray-500">ID: {service._id.slice(-6)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    service.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.isActive ? 'Ativo' : 'Inativo'}
                  </span>
                </div>

                {/* Service Details */}
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duração:</span>
                    <span className="text-gray-900">{service.duration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacidade:</span>
                    <span className="text-gray-900">{service.Capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reservas/Semana:</span>
                    <span className="text-gray-900">{service.maxWeeklyBookings}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6">
                  {service.publicDescription}
                </p>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    className="flex-1 bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                    onClick={() => {/* Implementar edição */}}
                  >
                    <PencilIcon className="w-4 h-4 mr-2" />
                    Editar
                  </button>
                  <button
                    className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-lg transition-colors"
                    onClick={() => handleDelete(service._id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Administração de Serviços • 
            <a href="#" className="ml-2 text-blue-600 hover:text-blue-700">Ajuda e Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminServicesPage;
