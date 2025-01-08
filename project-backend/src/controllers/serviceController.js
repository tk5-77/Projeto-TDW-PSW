const { Service, Slot } = require('../models/service');

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
        bookedCount: { $lt: '$capacity' }
      }).sort('startTime');
      res.json(slots);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = { serviceController };