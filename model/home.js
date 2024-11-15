const path =require("path");
const fs =require("fs");
const rootdir =require("./../util/path");
const favourite = require("./favourite");
const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");
const e = require("express");


const homfilepath=path.join(rootdir, "data", "homes.json");


module.exports= class Register{
  constructor(house,location,rating,url,Price,discription,_id){
    this.housename=house;
    this.location=location;
    this.rating=rating;
    this.photurl=url;
    this.price=Price;
    this.discription=discription;

    if(_id){  
      this._id= new ObjectId(String(_id));
    }
   
 

  }
  save(){
    const bd =getDb(); 
    if(this._id){
      
      return bd.collection("homes").updateOne({_id : this._id},{$set : this}).then(result => {
        console.log(result);
        console.log("came to update",this._id);
      });
    }else{
      console.log("came to insert");
      return bd.collection("homes").insertOne(this);

    } 
   
    
  }
  static fetch(){
    const db=getDb();
    return db.collection("homes").find().toArray();
    

  }

  static findById(homeId) {
    const db=getDb();
    return db.collection("homes").find({_id : new ObjectId(String(homeId))}).next()
    .then(home => {
      console.log(home);
      return home 
    }).catch(err => console.log(err));
   
  }
  static deleteById(homeId) {
    const db=getDb();
    return db.collection("homes").deleteOne({_id : new ObjectId(String(homeId))})
    .then(home => {
      console.log(home);
      return home 
    }).catch(err => console.log(err));
 

}
}
