const mongoose = require("mongoose");
const favourite = require("./favourite");


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
});

homeSchema.pre("findOneAndDelete",async function (next) {
  const homeId = this.getQuery()["_id"];
  console.log(homeId);
  await favourite.deleteMany({homeId});
  next();
   

})


module.exports = mongoose.model("home", homeSchema);






