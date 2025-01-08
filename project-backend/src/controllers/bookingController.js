const { Booking, Slot } = require('../models/booking');

const bookingController = {
  async create(req, res) {
    try {
      const slot = await Slot.findById(req.body.slotId);
      if (!slot || slot.bookedCount >= slot.capacity) {
        throw new Error('Slot not available');
      }

      const booking = new Booking({
        user: req.user._id,
        service: slot.service,
        slot: slot._id
      });

      slot.bookedCount += 1;
      await Promise.all([booking.save(), slot.save()]);
      
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async cancel(req, res) {
    try {
      const booking = await Booking.findById(req.params.id)
        .populate('slot service');
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      const now = new Date();
      const startTime = new Date(booking.slot.startTime);
      const minutesDiff = (startTime - now) / (1000 * 60);

      if (minutesDiff < booking.service.cancellationDeadline) {
        throw new Error('Cancellation deadline has passed');
      }

      booking.status = 'cancelled';
      booking.slot.bookedCount -= 1;
      
      await Promise.all([booking.save(), booking.slot.save()]);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = { bookingController };