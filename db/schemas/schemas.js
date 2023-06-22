const mongoose = require("mongoose");

const {Schema} = require("mongoose");

const schema = new Schema({
  username:{
    type: String
  },
  password:{
    type:String
  },
  PIN: Number,
  id: String,
  files: [String]
  
})


const User = mongoose.model('User',schema)

module.exports = User