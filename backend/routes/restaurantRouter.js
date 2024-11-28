const express = require('express');
const restaurantRouter = express.Router();
const {RestaurantModel} = require('../models/restaurant.model');
const seedData = require("../data/seedData");
//const seedDatabase = async () => {
//    try {
//        await RestaurantModel.deleteMany();
//        await RestaurantModel.insertMany(seedData);
//        console.log("Database seeded successfully.");
//    } catch (error) {
//        console.error("Error seeding the database:", error.message);
//    }
//};
//seedDatabase();

restaurantRouter.get("/", async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

restaurantRouter.post("/publish", async (req, res) => {
    const { name, image, price, rating } = req.body;

   
    if (!name || !image || !price) {
        return res.status(400).json({ error: "Dish name, image, and price are required." });
    }

    
    if (price <= 0) {
        return res.status(400).json({ error: "Price must be a positive value." });
    }

    try {
       
        let restaurant = new RestaurantModel({
            name,
            image,
            price,
            rating
        });

        
        await restaurant.save();

        res.status(201).json({ message: "Dish added successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Error occurred while adding the dish." });
    }
});

restaurantRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDish = await RestaurantModel.findByIdAndDelete(id);
        if (!deletedDish) {
            return res.status(404).json({ error: 'Dish not found' });
        }
        res.json({ message: 'Dish deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = restaurantRouter;