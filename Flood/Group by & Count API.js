const express = require('express');
const router = express.Router();

const FloodReport = require('./floodSchema');

// Group by floodLevel and count
router.get('/floods/count-by-level', async (req, res) => {
    try {
        const counts = await FloodReport.aggregate([
            {
                $group: {
                    _id: "$floodLevel",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(counts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
