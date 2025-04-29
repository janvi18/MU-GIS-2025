const express = require('express');
const router = express.Router();

const FloodReport = require('./floodSchema');

// Create Flood Report
router.post('/floods', async (req, res) => {
    try {
        const newFlood = new FloodReport(req.body);
        await newFlood.save();
        res.status(201).json(newFlood);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Flood Reports
router.get('/floods', async (req, res) => {
    try {
        const floods = await FloodReport.find();
        res.json(floods);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Single Flood Report by ID
router.get('/floods/:id', async (req, res) => {
    try {
        const flood = await FloodReport.findById(req.params.id);
        if (!flood) return res.status(404).json({ error: 'Flood report not found' });
        res.json(flood);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Flood Report by ID
router.put('/floods/:id', async (req, res) => {
    try {
        const updatedFlood = await FloodReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFlood) return res.status(404).json({ error: 'Flood report not found' });
        res.json(updatedFlood);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Flood Report by ID
router.delete('/floods/:id', async (req, res) => {
    try {
        const deletedFlood = await FloodReport.findByIdAndDelete(req.params.id);
        if (!deletedFlood) return res.status(404).json({ error: 'Flood report not found' });
        res.json({ message: 'Flood report deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
