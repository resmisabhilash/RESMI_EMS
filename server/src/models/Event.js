const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  ticketsAvailable: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false }, // Store the image URL from Cloudinary
});

module.exports = mongoose.model('Event', eventSchema);
