const express = require('express');
const router = express.Router();
const Booking = require('../models/bookings');

// Récupérer toutes les réservations
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('trip');
        res.json({ result: true, bookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

 // supprimer une réservation
router.delete('/bookings/delete/:id', async (req, res) => {
    try {
        const bookedItem = await Booking.findByIdAndDelete(req.params.id);
        if (!bookedItem) {
            return res.status(404).json({ message: 'Trajet non trouvé dans le panier' });
        }

        res.json({ result: true, message: 'Trajet supprimé de vos bookings' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
