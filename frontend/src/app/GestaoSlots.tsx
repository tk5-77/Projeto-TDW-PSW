import React, { useEffect, useState } from 'react';
//import { useParams, useNavigate } from 'react-router-dom';
//import API from '../services/api';

const ServiceDetails: React.FC = () => {
  const { id: serviceId } = useParams<{ id: string }>();
  const [service, setService] = useState<any>(null);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceAndSlots = async () => {
      try {
        // Fetch service details
        const serviceResponse = await API.get(`/api/services/${serviceId}`);
        setService(serviceResponse.data);

        // Fetch slots for the service
        const slotsResponse = await API.get(`/api/services/${serviceId}/slots`);
        setSlots(slotsResponse.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch service details or slots.');
      }
    };

    fetchServiceAndSlots();
  }, [serviceId]);

  const handleEditSlot = (slotId: string) => {
    navigate(`/services/${serviceId}/slots/${slotId}/edit`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Service Details</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {service && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold">{service.type}</h3>
            <p className="text-sm text-gray-600">Duration: {service.duration} minutes</p>
            <p className="text-sm text-gray-600">Capacity: {service.capacity}</p>
            <p className="text-sm text-gray-600">{service.publicDescription}</p>
          </div>
        )}

        <h3 className="text-xl font-semibold mb-4">Slots</h3>
        <ul>
          {slots.map((slot: any) => (
            <li
              key={slot._id}
              className="p-4 border-b border-gray-200 hover:bg-gray-100 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}
                </h3>
                <p className="text-sm text-gray-600">Capacity: {slot.capacity}</p>
                <p className="text-sm text-gray-600">Booked: {slot.bookedCount}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditSlot(slot._id)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceDetails;