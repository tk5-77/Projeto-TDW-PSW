// const { Entity } = require("./user");
// const mongoose = require('mongoose');

// const entitySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   description: { type: String },
//   image:{ type: String},
// }, { timestamps: true });

// module.exports = { Entity: mongoose.model('Entity', entitySchema) };




const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
}, { timestamps: true }
);

module.exports = { Entity: mongoose.model('Entity', entitySchema) };