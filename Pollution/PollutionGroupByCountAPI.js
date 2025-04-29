const express = require('express');
const router = express.Router();

const PollutionReport = require('./pollutionSchema');

// Group pollution reports by type and count
router.get('/pollution/count-by-type', async (req, res) => {
    try {
        const counts = await PollutionReport.aggregate([
            {
                $group: {
                    _id: "$type",      // Group by 'type' field
                    count: { $sum: 1 } // Count number of documents
                }
            }
        ]);
        res.json(counts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
