const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));




const userSchema=mongoose.Schema({
    userName:String,
    email:String,
    password:String,
    Age:Number,
});

module.exports = mongoose.model("user",userSchema)