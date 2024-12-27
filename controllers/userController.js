// register a user
const User=require("../models/usermodel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

const registerUser=asyncHandler(async(req,res)=>{
    const {name,username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All Fields are Mandatory!");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User Already Registered!");
    }
    // hashed password here i have used 10 means that it will hashed it 10 times
    const hashedpassword=await bcrypt.hash(password,10);
    console.log("Hashed Password:",hashedpassword)
    const user=await User.create({
        name,
        username,
        email,
        password:hashedpassword
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }
    else{
        res.status(400);
        throw new Error("User Data is Not Valid");
    }
    res.json({message:"Register the User"});
});

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All Fields are Mandatory!");
    }
    const user=await User.findOne({email});
    // compare password with hashedpassword
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user._id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"3m"}
    );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Invalid Credentials");
    }
    res.json({message:"Login User"});
});

const currentUser=asyncHandler(async(req,res)=>{
    res.json(req.user);
});

module.exports={registerUser,loginUser,currentUser};