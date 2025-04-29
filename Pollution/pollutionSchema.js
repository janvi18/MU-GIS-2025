const mongoose = require('mongoose');
const pollutionSchema = new mongoose.Schema({
  type: String,
  location: String,
  geoCoords2: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  dateTime: { type: Date }
});
pollutionSchema.index({ geoCoords2: '2dsphere' });

const PollutionReport = mongoose.model('PollutionReport', pollutionSchema, 'pollution');

module.exports = PollutionReport;
