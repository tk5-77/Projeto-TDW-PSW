"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import API from "../../services/api";
import { useAuth } from "../../AuthContext";
import Link from "next/link";

interface Booking {
  _id: string;
  user: string;
  service: string;
  slot: string;
  status: string;
  createdAt: string;
}

interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
}

interface Client {
  _id: string;
  username: string;
  email: string;
}

interface Reservation {
  booking: Booking;
  slot: Slot;
  client: Client;
}

const FuncionarioGerirReservaPage: React.FC = () => {
  const { serviceId } = useParams();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const authContext = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await API.get(`/services/slotsLotation?serviceId=${serviceId}`);
        setReservations(response.data);
      } catch (err) {
        setError("Falha ao carregar as reservas");
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [serviceId]);

  const handleDeleteReservation = async (bookingId: string) => {
    if (!window.confirm("Tem certeza que deseja apagar esta reserva?")) return;
    try {
      await API.delete(`/bookings/deleteBooking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReservations(reservations.filter(booking => booking.booking._id !== bookingId));
    } catch (error) {
      console.error("Erro ao deletar marcação", error);
      setError("Falha ao deletar a marcação");
    }
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg z-10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Bookify
            </h1>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* Conteúdo */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestão de Reservas</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">Carregando...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {reservations.length === 0 ? (
              <div className="col-span-full flex justify-center items-center h-64">
                <p className="text-gray-600">Nenhuma reserva encontrada.</p>
              </div>
            ) : (
              reservations.map((reservation) => (
                <div
                  key={reservation.booking._id}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="space-y-6">
                    {/* Cabeçalho do Card */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xl">
                          {reservation.client.username[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-800">
                          {reservation.client.username}
                        </p>
                        <p className="text-sm text-gray-500">
                          {reservation.client.email}
                        </p>
                      </div>
                    </div>

                    {/* Detalhes da Reserva */}
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span
                          className={`text-sm font-semibold ${
                            reservation.booking.status === "confirmado"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {reservation.booking.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Data:</span>
                        <span className="text-sm text-gray-800">
                          {new Date(reservation.booking.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Início:</span>
                        <span className="text-sm text-gray-800">
                          {new Date(reservation.slot.startTime).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Fim:</span>
                        <span className="text-sm text-gray-800">
                          {new Date(reservation.slot.endTime).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    {/* Botão de Ação */}
                    <button
                      className="mt-6 w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold"
                      onClick={() => handleDeleteReservation(reservation.booking._id)}
                    >
                      Apagar Reserva
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* Footer */}
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
              <li>Rua da Tapada, 241</li>
              <li>contato@bookify.pt</li>
              <li>+351 912 345 678</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Siga-nos</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                <span className="sr-only">Facebook</span>
                {/* Ícone do Facebook */}
                <div className="w-5 h-5 bg-gray-400"></div>
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                <span className="sr-only">Instagram</span>
                {/* Ícone do Instagram */}
                <div className="w-5 h-5 bg-gray-400"></div>
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                <span className="sr-only">WhatsApp</span>
                {/* Ícone do WhatsApp */}
                <div className="w-5 h-5 bg-gray-400"></div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FuncionarioGerirReservaPage;