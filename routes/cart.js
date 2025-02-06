const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');

// Route pour obtenir tous les trajets du panier
router.get('/cart', (req, res) => {
    console.log("on teste sur le get ")
    console.log(req.session);
    const cart = req.session.cart || []; // on utilise la session pour le panier
    
    if (cart.length === 0) {
        return res.status(200).json({ message: 'Votre panier est vide.' }); // Message explicite si le panier est vide
    }

    res.json(cart); // Retourne le panier
});

// Route pour ajouter un trajet au panier
router.post('/cart/add', async (req, res) => {
    const { tripId } = req.body;
    console.log(req.body);
    try {
        // Cherche le trajet à ajouter au panier
        const trip = await Trip.findById(tripId);
        if (trip) {
            // Ajoute le trajet au panier (dans la session)
            if (!req.session.cart) req.session.cart = [];
            req.session.cart.push(trip);
            console.log("on teste sur le post");
            console.log(req.session);
            return res.status(200).json({ message: 'Trajet ajouté au panier - On est good cote backend' });
        } else {
            return res.status(404).json({ message: 'Trajet introuvable' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Route pour supprimer un trajet du panier
router.delete('/cart/remove', (req, res) => {
    const { tripId } = req.body;
    const cart = req.session.cart || [];

    // Trouve et supprime le trajet du panier
    req.session.cart = cart.filter(trip => trip._id.toString() !== tripId);
    res.status(200).json({ message: 'Trajet supprimé du panier' });
});

module.exports = router;
