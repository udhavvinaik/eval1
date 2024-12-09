const express = require('express');
const Order = require('../models/orders.model');
const Orderrouter = express.Router();


Orderrouter.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
});


Orderrouter.post('/add', async (req, res) => {
  try {
    const { customerName,deliveryAddress, dishes,totalPrice } = req.body;

    if (!customerName || !Array.isArray(dishes) || dishes.length === 0) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const newOrder = new Order({
      customerName,
      deliveryAddress,
      dishes,
      totalPrice
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order added successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add order', details: error.message });
  }
});

Orderrouter.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order', details: error.message });
  }
});

module.exports = Orderrouter;