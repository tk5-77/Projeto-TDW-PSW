const slotSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  capacity: { type: Number, required: true },
  bookedCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports ={Slot: mongoose.model('Slot', slotSchema)};