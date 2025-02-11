const { Service } = require('../models/service');
const { Slot } = require('../models/slot');
const { Booking } = require('../models/booking');
const User = require('../models/user');

const serviceController = {
  async create(req, res) {
    try {
      const service = new Service({
        ...req.body,
        entity: req.params.entityId
      });
      await service.save();
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async createNew(req, res) {
    try {
      const entity = new Entity({
        ...req.body,
        admins: [req.user._id]
      });
      await entity.save();
      await User.findByIdAndUpdate(req.user._id, { entity: entity._id });
      res.status(201).json(entity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async createSlot(req, res) {
    try {
      const slot = new Slot({
        ...req.body,
        service: req.params.serviceId
      });
      await slot.save();
      res.status(201).json(slot);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAvailableSlots(req, res) {
    try {
      const slots = await Slot.find({
        service: req.params.serviceId,
        startTime: { $gt: new Date() },
        bookedCount: { $lt: 100 }  //adicionado
      }).sort('startTime');
      res.json(slots);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async updateSlot(req, res) {
    try {
      const slot = await Slot.findOneAndUpdate(
        { _id: req.params.id, service: req.params.serviceId },
        req.body,
        { new: true }
      );
      if (!slot) {
        return res.status(404).json({ error: 'Slot not found' });
      }
      res.json(slot);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteSlot(req, res) {
    try {
      const slot = await Slot.findOneAndDelete({ _id: req.params.id, service: req.params.serviceId });
      if (!slot) {
        return res.status(404).json({ error: 'Slot not found' });
      }
      res.json({ message: 'Slot deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete slot' });
    }
  },
  async getServices(req, res) {
    try {
      const { entityId } = req.params;
      if (!entityId) {
        return res.status(400).json({ error: "ID da entidade é necessário." });
      }

      const services = await Service.find({ entity: entityId });
      return res.status(200).json(services);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      return res.status(500).json({ error: "Erro interno ao buscar serviços." });
    }
  },
  async getServicesBooking(req, res) {
    try {
      const serviceId = req.query.serviceId;

      if (!serviceId) {
        return res.status(400).json({ error: "ID da entidade é necessário." });
      }

      const bookings = await Booking.find({ service: serviceId });
      const bookingsData = [];

      for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i];
        const slot = await Slot.findById(booking.slot);
        const client = await User.findById(booking.user);

        bookingsData.push({
          booking,
          slot,
          client
        });
      }

      return res.status(200).json(bookingsData);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
      return res.status(500).json({ error: "Erro interno ao buscar serviços." });
    }
  },
  async update(req, res) {
    try {
      const service = await Service.findByIdAndUpdate(req.params.serviceId, {
        ...req.body
      })
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async deleteOne(req, res) {
    try {
      const service = await Service.findByIdAndDelete(req.params.serviceId);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}



module.exports = { serviceController };
