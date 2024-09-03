const mongoose = require('mongoose');
const restaurantSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    rating: Number,
})

const RestaurantModel = mongoose.model('restaurant',restaurantSchema);
module.exports = {RestaurantModel};