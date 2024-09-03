const mongoose = require('mongoose');
require('dotenv').config();

try{
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Connected to MongoDB");
}catch(e){
    console.error("Error connecting to MongoDB:");
}

module.exports = mongoose;
