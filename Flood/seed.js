const mongoose = require('mongoose');

const FloodReport = require('./floodSchema');
const PollutionReport = require('./pollutionSchema');

mongoose.connect('mongodb+srv://Cluster97996:GeoDB%402025@geodb.dys4v.mongodb.net/Floods?retryWrites=true&w=majority&appName=geoDB')
    .then(async () => {
        console.log('✅ Connected to MongoDB');

        await FloodReport.insertMany([
            {
                type: 'flood',
                location: 'Charleston, SC',
                geoCoords2: { type: 'Point', coordinates: [-79.9311, 32.7765] },
                dateTime: '2025-03-22T10:00:00Z'
            },
            {
                type: 'flood',
                location: 'Waterfront Park',
                geoCoords2: { type: 'Point', coordinates: [-79.925, 32.777] },
                dateTime: '2025-03-23T14:00:00Z'
            }
        ]);

        await PollutionReport.insertMany([
            {
                type: 'pollution',
                location: 'College of Charleston',
                geoCoords2: { type: 'Point', coordinates: [-79.939, 32.7812] },
                dateTime: '2025-03-22T09:30:00Z'
            },
            {
                type: 'pollution',
                location: 'King Street',
                geoCoords2: { type: 'Point', coordinates: [-79.928, 32.776] },
                dateTime: '2025-03-23T16:45:00Z'
            }
        ]);

        console.log('✅ Sample data inserted');
        mongoose.disconnect();
    })
    .catch(err => console.error('❌ MongoDB error:', err));
