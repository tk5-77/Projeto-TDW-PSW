"use client";

import { useEffect, useState } from "react";
import API from "../services/api";
import Link from "next/link";
import { useAuth } from "../AuthContext";

interface Booking {
  _id: string;
  service: {
    type: string;
    capacity: number;
    entity: string;
  };
  slot: {
    startTime: string;
    endTime: string;
    capacity: number;
  };
  status: string;
  entity: {
    name: string;
  };
}

export default function CustomerHistory() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const authContext = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await API.get("/bookings/getUserPastBookings");
        // Ajusta os dados para ficarem no formato esperado
        const formattedBookings = response.data.map((item: any) => ({
          _id: item.booking._id,
          service: item.booking.service,
          slot: item.booking.slot,
          status: item.booking.status,
          entity: item.entity,
        }));
        setBookings(formattedBookings);
      } catch (error) {
        console.error("Erro ao buscar histórico de reservas", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Header da segunda página */}
      <header className="bg-white shadow z-10">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Bookify</h1>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/ClientDashboardentidades"
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

      {/* Conteúdo principal da primeira página */}
      <main className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-semibold mb-8">Suas Reservas Anteriores</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-600">Nenhuma reserva encontrada.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {booking.service?.type || "Serviço não disponível"}
                </h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Capacidade:</span>{" "}
                  {booking.service?.capacity ?? "Não especificado"}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Status:</span> {booking.status}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">Horário:</span>{" "}
                  {booking.slot?.startTime
                    ? new Date(booking.slot.startTime).toLocaleString()
                    : "Horário não especificado"}{" "}
                  -{" "}
                  {booking.slot?.endTime
                    ? new Date(booking.slot.endTime).toLocaleString()
                    : "Horário não especificado"}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">Entidade:</span> {booking.entity.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer da segunda página */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Cinfães Fit & Barber</h3>
            <p className="text-sm">Elevando padrões de beleza e bem-estar desde 2023</p>
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
              <li>contato@bookify.pt</li>
              <li>+351 912 345 678</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Siga-nos</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <div className="w-5 h-5 bg-gray-400"></div>
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <div className="w-5 h-5 bg-gray-400"></div>
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <span className="sr-only">WhatsApp</span>
                <div className="w-5 h-5 bg-gray-400"></div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
