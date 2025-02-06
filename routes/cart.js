const express = require('express');
const router = express.Router();
const Cart = require('../models/card');
const Trip = require('../models/trip');
const Booking = require('../models/bookings');

// Ajouter un trajet au panier
router.post('/cart/add', async (req, res) => {
    try {
        const { tripId } = req.body;

        if (!tripId) {
            return res.status(400).json({ message: 'Trip ID requis' });
        }

        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Trip non trouvé' });
        }
        // Vérifier si le trajet est déjà dans le panier
        const existingCartItem = await Cart.findOne({ trip: tripId });
        if (existingCartItem) {
            return res.status(400).json({ message: 'Ce trajet est déjà dans le panier' });
        }

        const newCartItem = new Cart({ trip: tripId });
        await newCartItem.save();

        res.json({ result: true, message: 'Trajet ajouté au panier' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Afficher tous les trajets du panier
router.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('trip');
        res.json({ result: true, cart: cartItems });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Supprimer un trajet du panier
router.delete('/cart/delete/:id', async (req, res) => {
    try {
        const cartItem = await Cart.findByIdAndDelete(req.params.id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Trajet non trouvé dans le panier' });
        }

        res.json({ result: true, message: 'Trajet supprimé du panier' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/cart/pay/:id', async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id).populate('trip');
        if (!cartItem) {
            return res.status(404).json({ message: "Trajet non trouvé dans le panier" });
        }

        const existingBooking = await Booking.findOne({ trip: cartItem.trip._id });
        if (existingBooking) {
            return res.status(400).json({ message: "Ce trajet est déjà réservé" });
        }

        // Marquer l'élément comme payé et l'ajouter aux réservations
        const newBooking = new Booking({ trip: cartItem.trip });
        await newBooking.save();

        // Supprimer l'élément du panier
        await Cart.findByIdAndDelete(req.params.id);

        res.json({ result: true, message: "Trajet payé et ajouté aux réservations" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
