const express = require("express");
const mongoose = require('./db');
const cors = require("cors");
const restaurantRouter = require("./routes/restaurantRouter");
const cartRouter = require("./routes/cartRouter");
const userRouter = require("./routes/userRouter");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/restaurants",restaurantRouter);
app.use("/cart",cartRouter);
app.use("/users",userRouter);
app.listen(PORT, async() => {
    try{
        await mongoose;
    }
    catch(err){
        console.log(err.message);
    }
    console.log("Server running on port 5000");
});
