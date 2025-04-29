const mongoose = require('mongoose');
const PollutionReport = require('./models/pollutionSchema');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Cluster97996:GeoDB%402025@geodb.dys4v.mongodb.net/Floods?retryWrites=true&w=majority&appName=geoDB')
    .then(async () => {
        console.log('✅ Connected to MongoDB');

        await PollutionReport.insertMany([
            {
                type: 'air pollution',
                location: 'Downtown City Center',
                geoCoords2: { type: 'Point', coordinates: [-79.9311, 32.7765] },
                dateTime: '2025-04-23T10:00:00Z'
            },
            {
                type: 'water pollution',
                location: 'Riverfront Area',
                geoCoords2: { type: 'Point', coordinates: [-79.9250, 32.7770] },
                dateTime: '2025-04-24T12:30:00Z'
            },
            {
                type: 'noise pollution',
                location: 'Industrial Zone',
                geoCoords2: { type: 'Point', coordinates: [-79.9390, 32.7812] },
                dateTime: '2025-04-24T15:00:00Z'
            }
        ]);

        console.log('✅ Pollution sample data inserted');
        mongoose.disconnect();
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));
