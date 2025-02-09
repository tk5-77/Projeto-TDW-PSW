const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['client', 'admin_entity', 'user_entity'], 
        default: 'client'
    },
    entity: { type: mongoose.Schema.Types.ObjectId, ref: 'Entity' }
});
module.exports = mongoose.model('User', userSchema);