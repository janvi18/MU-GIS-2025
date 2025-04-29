const express = require('express');
const router = express.Router();

const FloodReport = require('./floodSchema');
const PollutionReport = require('./pollutionSchema');

router.get('/dashboard-summary', async (req, res) => {
    try {
        // Count totals
        const totalFloods = await FloodReport.countDocuments();
        const totalPollution = await PollutionReport.countDocuments();

        // Calculate date for 7 days ago
        // const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
        const weekAgoISO = "2025-03-21T00:00:00Z";

        // const weekAgoISO = weekAgo.toISOString();

        // Count recent floods/pollution using ISO string comparison
        const recentFloods = await FloodReport.countDocuments({
            dateTime: { $gte: weekAgoISO }
        });

        const recentPollution = await PollutionReport.countDocuments({
            dateTime: { $gte: weekAgoISO }
        });

        // Respond with dashboard summary
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
