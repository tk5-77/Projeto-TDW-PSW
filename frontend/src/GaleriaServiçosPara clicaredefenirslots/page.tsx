import { useEffect, useState } from 'react';
import API from '../app/services/api';

export default function EmpresaServicos({ entityId }) {
  const [empresa, setEmpresa] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpresaEServicos = async () => {
      try {
        // Buscar detalhes da empresa
        const empresaRes = await API.get(`/api/entities/${entityId}`);
        setEmpresa(empresaRes.data);

        // Buscar serviços associados à empresa
        const servicosRes = await API.get(`/api/services/${entityId}`);
        setServicos(servicosRes.data);
      } catch (err) {
        setError('Erro ao carregar os dados');
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresaEServicos();
  }, [entityId]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {empresa && (
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{empresa.name}</h1>
          <p className="text-gray-600 mt-2">{empresa.description}</p>
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Serviços Disponíveis</h2>
      {servicos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {servicos.map((servico) => (
            <div key={servico._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img 
                src={servico.imageUrl || '/placeholder.jpg'} 
                alt={servico.type} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{servico.type}</h3>
                <p className="text-gray-600 mt-2">{servico.publicDescription}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Nenhum serviço disponível.</p>
      )}
    </div>
  );
}
