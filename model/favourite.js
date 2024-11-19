const { MongoDriverError } = require("mongodb");
const mongoose = require("mongoose");


const FavouriteSchema = mongoose.Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "home",
    unique: true,
  },
 
});



module.exports = mongoose.model("favourite", FavouriteSchema);


