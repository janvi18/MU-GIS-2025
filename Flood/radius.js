const express = require('express');
const router = express.Router();

const FloodReport = require('./floodSchema');
const PollutionReport = require('./pollutionSchema');

// Radius-based nearby search
router.post('/nearby', async (req, res) => {
    const { coordinates, radius } = req.body;

    if (!coordinates || !radius) {
        return res.status(400).json({ error: 'Coordinates and radius are required.' });
    }

    try {
        const floods = await FloodReport.find({
            geoCoords2: {
                $near: {
                    $geometry: { type: 'Point', coordinates },
                    $maxDistance: radius
                }
            }
        });

        const pollution = await PollutionReport.find({
            geoCoords2: {
                $near: {
                    $geometry: { type: 'Point', coordinates },
                    $maxDistance: radius
                }
            }
        });

        res.json({ floods, pollution });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
