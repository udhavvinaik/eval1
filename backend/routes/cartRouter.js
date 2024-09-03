const express = require('express');
const cartRouter = express.Router();
const {CartModel} = require('../models/cart.model');

cartRouter.get("/", async (req, res) => {
    try {
        const cart = await CartModel.find();
        res.json(cart);
    } catch (error) {
        res.send(error.message);
    }
});

cartRouter.post("/add", async (req, res) => {
    const { name, price} = req.body;
    try {
        const newItem = new CartModel({ name,price});
        await newItem.save();
        res.send("item added to cart");
    } catch (error) {
        res.send(error.message);
    }
});

cartRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await CartModel.findByIdAndDelete(id);
        if (deletedItem) {
            res.send("Item removed from cart");
        } else {
            res.send("Item not found");
        }
    } catch (error) {
        res.send(error.message);
    }
});

cartRouter.delete("/deleteAll",async (req, res) => {
    try{
        await CartModel.deleteMany({});
        res.send("deleted everything");
    }catch (error) {
        res.send(error.message);
    }
});
module.exports = cartRouter;