const mongoose = require("mongoose");


const homeSchema = new mongoose.Schema({  
  housename: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  photurl: {
    type: String
  },
  price: {
    type: Number,
    required: true,
  },
  discription: {
    type: String,
    
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});





module.exports = mongoose.model("home", homeSchema);






