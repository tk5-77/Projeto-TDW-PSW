'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import Link from 'next/link';
import { CalendarDays, Clock, User, Home, LogIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slot {
  _id: string;
  slotStart: string;
  slotEnd: string;
  capacity: number;
  bookedCount: number;
}

export default function ServiceSlots() {
  const { serviceId } = useParams();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Configuração de horário comercial
  const openingHour = 9; // exemplo: abre às 09:00 (pode ajustar conforme sua necessidade)
  const closingHour = 22;
  
  // Ajusta o horário atual para que fique dentro dos limites comerciais
  const now = new Date().getHours();
  const initialHour =
    now < openingHour ? openingHour : now >= closingHour ? closingHour - 1 : now;
  const [currentHour, setCurrentHour] = useState(initialHour);

  // Função para formatar o intervalo de horário (ex: "09:00 - 10:00")
  const formatHourRange = (hour: number) => {
    const start = hour.toString().padStart(2, '0') + ':00';
    const end = (hour === closingHour - 1 ? closingHour : hour + 1).toString().padStart(2, '0') + ':00';
    return `${start} - ${end}`;
  };

  // Função para reservar um slot
  async function schedulerSlot(
    slotStart: string,
    slotEnd: string,
    slotQuantity: number,
    slotMax: number
  ) {
    if (slotQuantity === slotMax) {
      alert('Slot cheio, tente outro horário');
      return;
    }

    try {
      await API.post(`/bookings`, { serviceId, startTime: slotStart, endTime: slotEnd });
      setSlots(prevSlots =>
        prevSlots.map(slot =>
          slot.slotStart === slotStart
            ? { ...slot, bookedCount: slot.bookedCount + 1 }
            : slot
        )
      );
      alert('Slot reservado com sucesso!');
    } catch (error) {
      alert('Erro ao reservar o slot.');
    }
  }

  // Busca os slots disponíveis para o intervalo definido
  useEffect(() => {
    if (!serviceId) return;

    const fetchSlots = async () => {
      setLoading(true);
      try {
        // Define a data de início e fim com base no currentHour
        const startTime = new Date();
        startTime.setHours(currentHour, 0, 0, 0);
        
        const endTime = new Date();
        endTime.setHours(currentHour + 1, 0, 0, 0);

        // Chamada à API filtrando pelo intervalo
        const response = await API.get(
          `/bookings?serviceId=${serviceId}&startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`
        );

        setSlots(response.data);
      } catch (err) {
        setError('Erro ao carregar os slots.');
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [serviceId, currentHour]);

  // Funções para navegar entre os intervalos de horário
  const handlePreviousHour = () => {
    setCurrentHour(prev => Math.max(openingHour, prev - 1));
  };

  const handleNextHour = () => {
    setCurrentHour(prev => Math.min(closingHour - 1, prev + 1));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/ClientDashboardentidades" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Home className="h-6 w-6" />
                <span className="text-lg font-semibold">Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <LogIn className="h-5 w-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <CalendarDays className="h-8 w-8 text-blue-600" />
              Agendamento por Horário
            </h1>
            
            {/* Controle de Horário */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePreviousHour}
                disabled={currentHour === openingHour}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700" />
              </button>

              <div className="bg-white px-6 py-3 rounded-lg shadow-md">
                <span className="text-xl font-semibold text-gray-800">
                  {formatHourRange(currentHour)}
                </span>
              </div>

              <button
                onClick={handleNextHour}
                disabled={currentHour === closingHour - 1}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>

          {slots.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum slot disponível neste horário.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {slots.map((slot) => {
                const startTime = new Date(slot.slotStart);
                const endTime = new Date(slot.slotEnd);
                
                return (
                  <div
                    key={slot._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>
                            {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                            {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-gray-600">
                              {slot.bookedCount}/{slot.capacity} reservados
                            </span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            slot.bookedCount < slot.capacity 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {slot.bookedCount < slot.capacity ? 'Disponível' : 'Esgotado'}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => schedulerSlot(slot.slotStart, slot.slotEnd, slot.bookedCount, slot.capacity)}
                        disabled={slot.bookedCount >= slot.capacity}
                        className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Reservar Este Horário
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} LuxeAgenda. Todos os direitos reservados.</p>
            <p className="mt-2">Sistema profissional de agendamentos por hora</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
