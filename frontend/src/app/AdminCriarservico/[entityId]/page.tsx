"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import API from "../../services/api";
import { useAuth } from "../../AuthContext";
import Link from "next/link";

const CreateServicePage: React.FC = () => {
  const { entityId } = useParams();
  const [type, setType] = useState("");
  const [duration, setDuration] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [privateDescription, setPrivateDescription] = useState("");
  const [publicDescription, setPublicDescription] = useState("");
  const [maxWeeklyBookings, setMaxWeeklyBookings] = useState(0);
  const [bookingDeadline, setBookingDeadline] = useState(10);
  const [cancellationDeadline, setCancellationDeadline] = useState(30);
  const [slots, setSlots] = useState([{ startTime: "", endTime: "", capacity: 0 }]);
  const router = useRouter();
  const authContext = useAuth();

  if (!authContext) {
    return <p className="text-red-500 text-center mt-4">Autenticação necessária.</p>;
  }

  const handleSlotChange = (index: number, field: string, value: string | number) => {
    const newSlots = [...slots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setSlots(newSlots);
  };

  const addSlot = () => {
    setSlots([...slots, { startTime: "", endTime: "", capacity: 0 }]);
  };

  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const serviceResponse = await API.post(`/services/${entityId}`, {
        type,
        duration,
        capacity,
        privateDescription,
        publicDescription,
        maxWeeklyBookings,
        bookingDeadline,
        cancellationDeadline,
      });
      const serviceId = serviceResponse.data._id;
      alert("Serviço criado com sucesso!");
      router.push(`/AdminDashboardServices/${entityId}`);//${entityId}
    } catch (error) {
      console.error("Erro ao criar serviço e slots", error);
    }
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      <header className="bg-white shadow z-10">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Cinfães Fit & Barber</h1>
          <div className="flex space-x-6">
            <Link href="/AdminHomePage" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          </div>
        </nav>
      </header>

      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6">
        <div className="bg-white p-10 rounded shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Criar Serviço</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-1">
              <label className="block text-gray-700">Tipo</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded" value={type} onChange={(e) => setType(e.target.value)} required />
            </div>
            <div>
              <label className="block text-gray-700">Duração (min)</label>
              <input type="number" className="w-full p-3 border border-gray-300 rounded" value={duration} onChange={(e) => setDuration(Number(e.target.value))} required />
            </div>
            <div>
              <label className="block text-gray-700">Capacidade</label>
              <input type="number" className="w-full p-3 border border-gray-300 rounded" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} required />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">Descrição Pública</label>
              <textarea className="w-full p-3 border border-gray-300 rounded" value={publicDescription} onChange={(e) => setPublicDescription(e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">Descrição Privada</label>
              <textarea className="w-full p-3 border border-gray-300 rounded" value={privateDescription} onChange={(e) => setPrivateDescription(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700">Máximo Reservas Semanais</label>
              <input type="number" className="w-full p-3 border border-gray-300 rounded" value={maxWeeklyBookings} onChange={(e) => setMaxWeeklyBookings(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-gray-700">Prazo de Reserva (min)</label>
              <input type="number" className="w-full p-3 border border-gray-300 rounded" value={bookingDeadline} onChange={(e) => setBookingDeadline(Number(e.target.value))} />
            </div>
            <button type="submit" className="col-span-2 bg-blue-500 text-white p-3 rounded">Criar Serviço</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateServicePage;
