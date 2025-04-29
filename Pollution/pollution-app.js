const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://Cluster97996:GeoDB%402025@geodb.dys4v.mongodb.net/Floods?retryWrites=true&w=majority&appName=geoDB';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Load Pollution Schema (optional if not used directly here)
require('./pollutionSchema');

// Load Routes
const pollutionCrudRoutes = require('./pollution-crud');
const pollutionRadiusRoutes = require('./pollution-radius');
const pollutionTimeBasedRoutes = require('./pollution-time-based');
const pollutionGroupByRoutes = require('./PollutionGroupByCountAPI');
const pollutionDashboardRoutes = require('./pollution-dashboard');

// Use Routes
app.use('/api', pollutionCrudRoutes);
app.use('/api', pollutionRadiusRoutes);
app.use('/api', pollutionTimeBasedRoutes);
app.use('/api', pollutionGroupByRoutes);
app.use('/api', pollutionDashboardRoutes);

// Polygon Search for Pollution
app.post('/api/polygon-search-pollution', async (req, res) => {
  const { coordinates, location, type, dateFrom, dateTo } = req.body;

  if (!coordinates || coordinates.length < 3) {
    return res.status(400).json({ error: 'Polygon with at least 3 coordinates required.' });
  }

  const polygon = {
    type: 'Polygon',
    coordinates: [coordinates]
  };

  const query = [
    { geoCoords2: { $geoWithin: { $geometry: polygon } } }
  ];

  if (type) query.push({ type });
  if (location) query.push({ location });
  if (dateFrom || dateTo) {
    const dateFilter = {};
    if (dateFrom) dateFilter.$gte = new Date(dateFrom);
    if (dateTo) dateFilter.$lte = new Date(dateTo);
    query.push({ dateTime: dateFilter });
  }

  try {
    const PollutionReport = require('./pollutionSchema');
    const pollution = await PollutionReport.find({ $and: query });
    res.json({ pollution });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Pollution GIS API running on http://localhost:${PORT}`);
});