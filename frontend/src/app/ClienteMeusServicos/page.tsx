"use client";

import React, { useState, useEffect } from "react";
import API from "../services/api";
import { useAuth } from "../AuthContext";
import Link from "next/link";

interface BookingData {
  booking: {
    _id: string;
    slot: {
      startTime: string;
      endTime: string;
    };
    service: {
      type: string;
    };
    status: string;
  };
  entity: {
    name: string;
  };
}

// Componente para os ícones de redes sociais (usado no footer)
const SocialIcon: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a
    href={href}
    className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
  >
    <span className="sr-only">{label}</span>
    {/* Substitua pelo ícone real desejado */}
    <div className="w-5 h-5 bg-gray-400"></div>
  </a>
);

const ClienteMeusServicosPage: React.FC = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const authContext = useAuth();

  if (!authContext) {
    return (
      <p className="text-red-500 text-center mt-4">
        Authentication context is not available.
      </p>
    );
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await API.get(`/bookings/getUserBookings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
        setError("Falha ao buscar as marcações");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [(authContext.user as any)?.token]);

  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm("Tem certeza que deseja apagar esta reserva?")) return;
    console.log("Deleting booking with ID:", bookingId);
    try {
      await API.delete(`/bookings/deleteBooking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookings(bookings.filter(booking => booking.booking._id !== bookingId));
    } catch (error) {
      console.error("Erro ao deletar marcação", error);
      setError("Falha ao deletar a marcação");
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
          <Link
            href="/ClientDashboardentidades"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
            Login
          </Link>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Minhas Marcações</h2>
        {loading ? (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <p className="text-center mt-4 text-lg text-red-500">{error}</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-600">Nenhuma marcação encontrada.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map(({ booking, entity }) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {booking.service.type}
                  </h3>
                  <p className="text-gray-500">{entity.name}</p>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Início:</span>{" "}
                  {new Date(booking.slot.startTime).toLocaleString()}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Fim:</span>{" "}
                  {new Date(booking.slot.endTime).toLocaleString()}
                </div>
                <div className="mb-2">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`font-medium ${
                      new Date(booking.slot.endTime) < new Date()
                        ? "text-red-500"
                        : booking.status === "confirmed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {new Date(booking.slot.endTime) < new Date()
                      ? "Expired"
                      : booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                  </span>
                </div>
                {/* Botão de Delete */}
                <button
                  onClick={() => handleDeleteBooking(booking._id)}
                  className="mt-4 w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-800 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors duration-300"
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
                  <span>Remover Marcação</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Espaço adicional para aumentar o scroll vertical */}
        <div className="h-32"></div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-8">
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
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Cortes Premium
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Tratamentos Faciais
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-300"
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

export default ClienteMeusServicosPage;