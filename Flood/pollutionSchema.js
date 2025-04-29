const mongoose = require('mongoose');

const pollutionSchema = new mongoose.Schema({
  type: String,
  location: String,
  geoCoords2: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  dateTime: String
});
pollutionSchema.index({ geoCoords2: '2dsphere' });

module.exports = mongoose.model('PollutionReport', pollutionSchema, 'reports', 'Pollution');
