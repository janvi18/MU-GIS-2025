// Main app.js for GIS Polygon API with modular routes and external models

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const MONGODB_URI = 'mongodb+srv://Cluster97996:GeoDB%402025@geodb.dys4v.mongodb.net/Floods?retryWrites=true&w=majority&appName=geoDB';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Load all modular route files
const radiusRoutes = require('./radius');
const timeRoutes = require('./time-based');
const groupRoutes = require('./Group by & Count API');
const dashboardRoutes = require('./dashboard');
const floodCrudRoutes = require('./flood-crud');

// Load models
const FloodReport = require('./floodSchema');
const PollutionReport = require('./pollutionSchema');

// Use imported routes
app.use('/api', radiusRoutes);
app.use('/api', timeRoutes);
app.use('/api', groupRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', floodCrudRoutes);

// Polygon Search Route
app.post('/api/polygon-search', async (req, res) => {
  let { coordinates } = req.body;
  if (!coordinates || coordinates.length < 3) {
    return res.status(400).json({ error: 'Polygon with at least 3 coordinates required.' });
  }

  if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
    coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
    coordinates.push(coordinates[0]);
  }

  const polygon = {
    type: 'Polygon',
    coordinates: [coordinates]
  };

  try {
    const floods = await FloodReport.find({ geoCoords2: { $geoWithin: { $geometry: polygon } } });
    const pollution = await PollutionReport.find({ geoCoords2: { $geoWithin: { $geometry: polygon } } });
    res.json({ floods, pollution });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 GIS API running on http://localhost:${PORT}`);
});