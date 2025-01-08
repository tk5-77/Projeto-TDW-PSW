const { Entity, Service } = require('../models/entity');

const entityController = {
  async create(req, res) {
    try {
      const entity = new Entity({
        ...req.body,
        admins: [req.user._id]
      });
      await entity.save();
      res.status(201).json(entity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const entities = await Entity.find().populate('admins users');
      res.json(entities);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const entity = await Entity.findById(req.params.id)
        .populate('admins users');
      if (!entity) {
        return res.status(404).json({ error: 'Entity not found' });
      }
      res.json(entity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = { entityController };
