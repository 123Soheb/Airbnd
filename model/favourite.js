const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");




module.exports= class favourite{
  constructor(homeId){
      this.homeId=homeId;
  }


  save(){
    const db =getDb(); 
    return db.collection("favourite").findOne({homeId : this.homeId})
    .then(existingfav => {
      if(!existingfav){
        return db.collection("favourite").insertOne(this); 
      }else{
        return Promise.resolve();
      }
    });
  }


  static fetch(){
    const db=getDb();
    return db.collection("favourite").find().toArray();
    
  }


  static removefavourite(homeId){
    const db=getDb();
    return db.collection("favourite").deleteOne({homeId : homeId});
    
  }
  

}
