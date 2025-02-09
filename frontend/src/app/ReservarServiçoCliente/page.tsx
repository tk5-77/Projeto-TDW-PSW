"use client";
import React, { useState, useEffect } from "react";
import API from "../services/api";                           //CLIENTE RESERVA SERVIÇO
import { useAuth } from "../AuthContext";

const ClientBookingPage: React.FC = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");
  const authContext = useAuth();
   
 
   if (!authContext) {
     return <p className="text-red-500 text-center mt-4">Authentication context is not available.</p>;
   }

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await API.get("/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Failed to fetch services", error);
      setError("Failed to fetch services");
    }
  };

  const fetchSlots = async (serviceId: string) => {
    try {
      const response = await API.get(`/api/services/${serviceId}/slots`);
      setSlots(response.data);
    } catch (error) {
      console.error("Failed to fetch slots", error);
      setError("Failed to fetch slots");
    }
  };

  const handleBookSlot = async (slotId: string) => {
    try {
      const response = await API.post("/api/bookings", { slotId });
      if (response.status === 201) {
        alert("Booking successful!");
        fetchSlots(selectedService!);
      }
    } catch (error) {
      console.error("Failed to book slot", error);
      setError("Failed to book slot");
    }
  };

  return (
    <div className="client-booking">
      <h1>Book a Service</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Available Services</h2>
      <ul>
        {services.map((service: any) => (
          <li key={service._id}>
            <h3>{service.type}</h3>
            <p>{service.publicDescription}</p>
            <button onClick={() => {
              setSelectedService(service._id);
              fetchSlots(service._id);
            }}>View Slots</button>
          </li>
        ))}
      </ul>

      {selectedService && (
        <div>
          <h2>Available Slots</h2>
          <ul>
            {slots.map((slot: any) => (
              <li key={slot._id}>
                <p>Start Time: {new Date(slot.startTime).toLocaleString()}</p>
                <p>End Time: {new Date(slot.endTime).toLocaleString()}</p>
                <p>Remaining Capacity: {slot.capacity - slot.bookedCount}</p>
                <button onClick={() => handleBookSlot(slot._id)}>Book Slot</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientBookingPage;