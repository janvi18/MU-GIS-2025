const express = require('express');
const router = express.Router();

const FloodReport = require('./floodSchema');
const PollutionReport = require('./pollutionSchema');

router.post('/reports-by-date', async (req, res) => {
    const { dateFrom, dateTo } = req.body;

    if (!dateFrom || !dateTo) {
        return res.status(400).json({ error: 'dateFrom and dateTo are required.' });
    }

    try {
        const filter = {
            dateTime: {
                $gte: dateFrom,
                $lte: dateTo
            }
        };

        const floods = await FloodReport.find(filter);
        const pollution = await PollutionReport.find(filter);
        res.json({ floods, pollution });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
