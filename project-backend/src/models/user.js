const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    enum: ['AdminEntity', 'UserEntity', 'Client'],
    required: true
  },
  entity: { type: mongoose.Schema.Types.ObjectId, ref: 'Entity' },
  subscribedServices: [{
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    subscribedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = {
  User: mongoose.model('User', userSchema),};