const { Service } = require('../models/service');
const { Slot } = require('../models/slot');
const { Booking } = require('../models/booking');
const { Entity } = require('../models/entity');

const createBooking = async (req, res) => {
    try {
        const { serviceId, startTime, endTime } = req.body;

        const slot = new Slot({
            startTime,
            endTime,
            capacity: 1,
            bookedCount: 1,
            service: serviceId
        });

        await slot.save();
        const slotId = slot._id;

        const booking = new Booking({
            user: req.user._id,
            service: serviceId,
            slot: slotId,
            status: 'confirmed'
        });

        await booking.save();
        res.status(201).send(booking);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Erro ao criar reserva' });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).send({ error: 'Reserva não encontrada' });
        }

        const slot = await Slot.findById(booking.slot);
        const now = new Date();
        const deadline = new Date(slot.startTime - (30 * 60000)); // 30 minutos antes

        if (now > deadline) {
            return res.status(400).send({ error: 'Cancelamento fora do prazo' });
        }

        await booking.remove();
        res.send({ message: 'Reserva cancelada com sucesso' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao cancelar reserva' });
    }
};

const getBookings = async (req, res) => {
    const serviceId = req.query.serviceId;

    const slots = await generateTimeSlots(serviceId);

    res.status(200).json(slots);
};

const getUserBookings = async(req, res) => {
  const userId = req.user._id;
  const bookings = await Booking.find({ user: userId }).populate('service').populate('slot');
  const generalBookings = [];

  for(const booking of bookings) {
    const entity = await Entity.findById(booking.service.entity);

    generalBookings.push({
      booking,
      entity
    });
  }

  res.status(200).json(generalBookings);
}

const getUserPastBookings = async(req, res) => {
  const userId = req.user._id;
  const bookings = await Booking.find({ user: userId }).populate('service').populate('slot');
  const generalBookings = [];

  for(const booking of bookings) {
    if(booking.slot.startTime < new Date()){
      const entity = await Entity.findById(booking.service.entity);

      generalBookings.push({
        booking,
        entity
      });
    }
  }

  res.status(200).json(generalBookings);
}

const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;

  if (!bookingId) {
    return res.status(400).send({ error: 'ID da reserva não fornecido' });
  }

  await Booking.findByIdAndDelete(bookingId);

  res.status(200).send({ message: 'Reserva excluída com sucesso' });
}


async function generateTimeSlots(serviceId) {
  const days = 10;
  const startHour = 10;
  const endHour = 22;
  const now = new Date();

  const service = await Service.findById(serviceId);
  if (!service) throw new Error("Service not found");

  const existingSlots = await Slot.find({ service: serviceId });
  const bookings = await Booking.find({ service: serviceId, status: 'confirmed' });

  const slotMap = new Map();

  for (let i = 0; i < days; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += service.duration) {
        const slotDate = new Date(currentDate);
        slotDate.setHours(hour, minute, 0, 0);
        // Ajusta o horário para compensar o fuso
        slotDate.setMinutes(slotDate.getMinutes() - slotDate.getTimezoneOffset());

        if (slotDate > now) {
          const slotKey = slotDate.toISOString();
          const slotEndTime = new Date(slotDate.getTime() + service.duration * 60000);

          // Obter todos os slots que possuem o mesmo horário de início
          const matchingSlots = existingSlots.filter(s => s.startTime.toISOString() === slotKey);
          // Obter os IDs dos slots correspondentes
          const slotIds = matchingSlots.map(s => s._id.toString());
          // Contar todos os bookings que referenciam qualquer um desses slots
          const bookedCount = bookings.filter(b => slotIds.includes(b.slot.toString())).length;

          slotMap.set(slotKey, { 
            slotStart: slotKey, 
            slotEnd: slotEndTime, 
            capacity: service.capacity, 
            bookedCount: bookedCount 
          });
        }
      }
    }
  }

  return Array.from(slotMap.values());
}

module.exports = { createBooking, getBookings, getUserBookings, deleteBooking, getUserPastBookings }; // Certifique-se de exportar ambas as funções