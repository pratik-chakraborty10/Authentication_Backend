const express = require('express');
const app= express();
const cookieParser = require('cookie-parser');
const path = require('path');
const userModel = require("./models/user");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());

app.get('/', function(req, res) {
   res.render("index")
});

app.post('/create',  async function(req, res) {
   let{username,email,password,age} = req.body;

   bcrypt.genSalt(10,  function(err, salt) {
      bcrypt.hash(password, salt, async function(err, hash) {
          // Store hash in your password DB.
          let createdUser = await userModel.create({
            username,
            email,
            password:hash,
            age
      })
        
      let token = jwt.sign({email},"shhhhhh");
      res.cookie("token",token)
  
      res.send(createdUser)
      });
   });

  
});

app.get('/login',function(req, res) {
   res.render('login');
})

app.post('/login', async function(req, res) {
   let user = await userModel.findOne({email:req.body.email})
   if(!user) return res.send("something went wrong");

   bcrypt.compare(req.body.password,user.password,function(err,result) {
        if(result){
         let token = jwt.sign({email:user.email},"shhhhhh");
         res.cookie("token",token)
         res.send("you are logged in successfully")
        }
         else res.send("you can't login")
   })
})

app.get('/logout', async function(req, res) {
   res.cookie("token","")
   res.redirect('/')
})





app.listen(5000);