const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    img:String
})

const CartModel = mongoose.model('cart',cartSchema);
module.exports = {CartModel};