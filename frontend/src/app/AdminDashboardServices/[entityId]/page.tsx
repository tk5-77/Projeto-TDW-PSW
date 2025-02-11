"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import API from "../../services/api";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Service {
  _id: string;
  type: string;
  duration: number;
  capacity: number;
  publicDescription: string;
  maxWeeklyBookings: number;
  isActive: boolean;
}

const AdminServicesPage = () => {
  const params = useParams();
  const router = useRouter();
  const { entityId } = params as { entityId: string };
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({});

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

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setFormData(service);
  };

  const handleDelete = async (serviceId: string) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        await API.delete(`/services/deleteService/${serviceId}`);
        setServices(services.filter((service) => service._id !== serviceId));
        alert("Serviço excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir serviço:", error);
        alert("Erro ao excluir serviço. Tente novamente.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      await API.post(`/services/serviceEdit/${editingService._id}`, formData);
      alert("Serviço atualizado com sucesso!");

      setServices(
        services.map((s) => (s._id === editingService._id ? { ...s, ...formData } : s))
      );

      setEditingService(null); // Fecha o formulário de edição
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
    }
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow z-10">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Bookify</h1>
          <div className="flex space-x-6">
            <Link href="/AdminHomePage" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
          </div>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{service.type}</h3>
                <p className="text-sm text-gray-500">ID: {service._id.slice(-6)}</p>
                <p className="text-sm mt-2"><strong>Duração:</strong> {service.duration} min</p>
                <p className="text-sm"><strong>Capacidade:</strong> {service.capacity}</p>
                <p className="text-sm"><strong>Reservas/Semana:</strong> {service.maxWeeklyBookings}</p>
                <p className="text-sm text-gray-600">{service.publicDescription}</p>
                <div className="flex mt-4 space-x-2">
                  <button
                    className="flex-1 bg-gray-100 text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                    onClick={() => handleEditClick(service)}
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

        {/* Formulário de edição embutido */}
        {editingService && (
          <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Editar Serviço</h2>
              <button onClick={() => setEditingService(null)}>
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="type" value={formData.type || ""} onChange={handleChange} placeholder="Tipo" className="w-full p-2 border rounded" />
              <input type="number" name="duration" value={formData.duration || ""} onChange={handleChange} placeholder="Duração" className="w-full p-2 border rounded" />
              <textarea name="publicDescription" value={formData.publicDescription || ""} onChange={handleChange} placeholder="Descrição pública" className="w-full p-2 border rounded"></textarea>
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Salvar</button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-8 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-lg font-bold text-white mb-4">Bookifyr</h3>
          <p className="text-sm">Bairro da Tapada, 241 - contato@bookify.pt - +351 912 345 678</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminServicesPage;
