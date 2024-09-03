const express = require('express');
const restaurantRouter = express.Router();
const {RestaurantModel} = require('../models/restaurant.model');
const seedData = require("../data/seedData");
const seedDatabase = async () => {
    try {
        await RestaurantModel.deleteMany();
        await RestaurantModel.insertMany(seedData);
        console.log("Database seeded successfully.");
    } catch (error) {
        console.error("Error seeding the database:", error.message);
    }
};
seedDatabase();

restaurantRouter.get("/", async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

restaurantRouter.post("/publish", async (req, res) => {
    const payload = req.body;
    try {
        let restaurant = new RestaurantModel(payload);
        await restaurant.save();
        res.send("Restaurant published successfully");
    } catch (err) {
        res.send("Error occurred: ");
    }
});

module.exports = restaurantRouter;