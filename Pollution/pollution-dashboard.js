const express = require('express');
const router = express.Router();

const PollutionReport = require('./pollutionSchema');

router.get('/dashboard-summary', async (req, res) => {
    try {
        // Total number of flood and pollution reports
        const totalFloods = await FloodReport.countDocuments();
        const totalPollution = await PollutionReport.countDocuments();

        // Calculate date for 7 days ago
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const weekAgoISO = weekAgo.toISOString();

        // Find recent floods and pollution (last 7 days)
        const recentFloods = await FloodReport.countDocuments({
            dateTime: { $gte: weekAgoISO }
        });

        const recentPollution = await PollutionReport.countDocuments({
            dateTime: { $gte: weekAgoISO }
        });

        // Respond with summary
        res.json({
            totalFloods,
            totalPollution,
            recentFloods,
            recentPollution
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
