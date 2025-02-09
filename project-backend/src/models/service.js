const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  entity: { type: mongoose.Schema.Types.ObjectId, ref: 'Entity', required: true },
  duration: { type: Number, required: true },
  capacity: { type: Number, required: true },
  privateDescription: { type: String },
  publicDescription: { type: String },
  maxWeeklyBookings: { type: Number },
  bookingDeadline: { type: Number, default: 10 },
  cancellationDeadline: { type: Number, default: 30 }
}, { timestamps: true });

module.exports={Service: mongoose.model('Service', serviceSchema)};