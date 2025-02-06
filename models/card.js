const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'trip', required: true },
    createdAt: { type: Date, default: Date.now },
    paid: { type: Boolean, default: false }
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;
