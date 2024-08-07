const express=require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

app.use(cookieParser());

app.get('/',(req, res) => {
    // res.cookie("name","Pratik");
    // res.send("done")
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("ouytyrhrhsjdvjbj", salt, function(err, hash) {
    //         // Store hash in your password DB.
    //         console.log(hash)
    //     });
    // });

    // bcrypt.compare("ouytyrhrhsjdvjbj", "$2b$10$9EYpu5T/d2KMzz0.PDtQN.MbuTDq/BawyPrKlQ/U1hXPdJggpwHJC", function(err, result) {
    //     // result == true
    //     console.log(result)
    // });

   let token =  jwt.sign({email:"pratik123@gmail.com",},"secret") //create token
   res.cookie("token", token); //send the token to the browser in cookies
   console.log(token);
   res.send("done");

})

app.get('/read',(req, res) => {
//    console.log(req.cookies.token);
   let data = jwt.verify(req.cookies.token,"secret") //verifying the token
   console.log(data)
   res.send('read page');
})
app.listen(3000);