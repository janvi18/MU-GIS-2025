const express = require('express');
const router = express.Router();
const PollutionReport = require('./pollutionSchema');

// Create Pollution Report
router.post('/pollutions', async (req, res) => {
    try {
        const report = new PollutionReport(req.body);
        await report.save();
        res.status(201).json(report);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read All Pollution Reports
router.get('/pollution', async (req, res) => {
    try {
        const reports = await PollutionReport.find();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read Pollution Report by ID
router.get('/pollution/:id', async (req, res) => {
    try {
        const report = await PollutionReport.findById(req.params.id);
        if (!report) return res.status(404).json({ error: 'Not found' });
        res.json(report);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update Pollution Report by ID
router.put('/pollution/:id', async (req, res) => {
    try {
        const report = await PollutionReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!report) return res.status(404).json({ error: 'Not found' });
        res.json(report);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Pollution Report by ID
router.delete('/pollution/:id', async (req, res) => {
    try {
        const report = await PollutionReport.findByIdAndDelete(req.params.id);
        if (!report) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
