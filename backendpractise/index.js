const { urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const express=require('express');
const path=require('path');
const userModel=require('./model/user')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')

const app=express();
app.use(express.json())
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser())
app.get('/',(req,res)=>{
    res.render('index');
})
app.post('/create', (req,res)=>{
    let {name,email,password}=req.body;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            const user=await userModel.create({
        name,email,password:hash
    }) 
    const token=jwt.sign({email},"shhhhhh");
    res.cookie("token",token);
    // console.log(hash);
    res.send(user);
        })
    })
    
})
app.get('/logout',(req,res)=>{
    res.cookie("token","");
    res.redirect('/');
})
app.get('/login',(req,res)=>{
    res.render('login');
})
// app.post('/login',(req,res)=>{
//     const user=userModel.findOne({email:req.body.email});
//     if(!user)res.send("user not found");
//     bcrypt.compare(req.body.password,user.password,async (err,res)=>{
//         if(res){
//             const token=await jwt.sign({email:user.email},"shhhhhh");
//             res.cookie("token",token);
//             res.send("you logged in successfully")
//         }else {
//             res.send("User not found");
//             // res.redirect('/');
//         }
//     })
// })
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.send("User not found");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.send("Invalid password");

        const token = jwt.sign({ email: user.email }, "shhhhhh");
        res.cookie("token", token);
        res.send("You logged in successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

app.listen(3000);