const express = require('express');
const router = express.Router();

const PollutionReport = require('./pollutionSchema');

// Radius-based nearby pollution search
router.post('/pollution/nearby', async (req, res) => {
    const { coordinates, radius } = req.body;

    if (!coordinates || !radius) {
        return res.status(400).json({ error: 'Coordinates and radius are required.' });
    }

    try {
        const pollution = await PollutionReport.find({
            geoCoords2: {
                $near: {
                    $geometry: { type: 'Point', coordinates },
                    $maxDistance: radius // in meters
                }
            }
        });

        res.json(pollution);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
