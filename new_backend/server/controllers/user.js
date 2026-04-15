const user=require('../models/users');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
module.exports.register=async(req,res)=>{
    try {
        const {name,email,message,password}=req.body;
        if(!name || !email || !message || !password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const users=await user.findOne({email:email});
        if(users){
            return res.status(400).json({message:"User already exists"});
        }
        const newUser = await new user({
            name,
            email,
            message,
            password: await bcrypt.hash(password,10)
        });
        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}
module.exports.login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please fill all the fields"});
    }
    const users=await user.findOne({email:email});
    if(!users){
        return res.status(400).json({message:"User does not exist"});
    }
    const match=await bcrypt.compare(password,users.password);
    if(!match){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const token=jwt.sign({id:users._id},process.env.SECRET_KEY);
    res.cookie('token',token,{httpOnly:true});
    console.log("Login successful");
    return res.status(200).json({message:"Login successful"});
}

module.exports.logout=(req,res)=>{
    return res.cookie("token","").json({message:"Logged out successfully"});
}