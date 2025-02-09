"use client";

// pages/service/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import API from '../services/api';

interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
}

export default function ServiceSlots() {
  const router = useRouter();
  const { id } = router.query; // Pegando o ID do serviço da URL

  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchSlots(id as string);
    }
  }, [id]);

  const fetchSlots = async (serviceId: string) => {
    try {
      setLoading(true);
      const response = await API.get(`/services/${serviceId}/slots`);
      setSlots(response.data);
    } catch (err) {
      setError('Erro ao carregar os slots.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando slots...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Slots Disponíveis</h1>
      {slots.length === 0 ? (
        <p>Nenhum slot disponível.</p>
      ) : (
        <ul className="space-y-4">
          {slots.map((slot) => (
            <li key={slot._id} className="border p-4 rounded shadow">
              <p><strong>Início:</strong> {new Date(slot.startTime).toLocaleString()}</p>
              <p><strong>Fim:</strong> {new Date(slot.endTime).toLocaleString()}</p>
              <p><strong>Capacidade:</strong> {slot.capacity}</p>
              <p><strong>Reservados:</strong> {slot.bookedCount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
