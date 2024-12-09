const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  dishes: [DishSchema],
  totalPrice:{
    type: Number
  }
  
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
