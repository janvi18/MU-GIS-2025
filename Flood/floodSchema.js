const mongoose = require('mongoose');

const floodSchema = new mongoose.Schema({
  type: String,
  location: String,
  geoCoords2: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  dateTime: String

});
floodSchema.index({ geoCoords2: '2dsphere' });

module.exports = mongoose.model('FloodReport', floodSchema, 'reports');
