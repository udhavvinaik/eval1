const express = require('express');
const userRouter = express.Router();
const {UserModel} = require("../models/user.model");

userRouter.get("/",async(req,res)=>{
    try{
        const users = await UserModel.find();
        res.json(users);
    }catch(err){
        res.send(err.message);
    }
})

userRouter.post("/signup",async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        const newUser = new UserModel({name,email,password});
        await newUser.save();
        res.send("successfull");
    }catch(err){
        res.send(err.message);
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}= req.body;
    try{
        const user = await  UserModel.findOne({email});
        if(!user){
            res.send("invalid email or password");
        }
        
        if(password !== user.password){
            res.send("invalid email or password");
        }
        const u = {name:user.name,email:user.email,password:user.password};
        res.json(u);
    }catch(err){
        res.send(err.message);
    }
})
module.exports = userRouter;