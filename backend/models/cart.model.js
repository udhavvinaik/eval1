const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
})

const CartModel = mongoose.model('cart',cartSchema);
module.exports = {CartModel};