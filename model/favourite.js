const path =require("path");
const fs =require("fs");
const rootdir =require("../util/path")


const favouritefile=path.join(rootdir, "data", "favourite.json");


module.exports= class favourite{


  static fetch(callback){
    fs.readFile(favouritefile, (error,data)=>{
      if(error){
        callback([]);
      }else{
        callback(JSON.parse(data));
      }
    })

  }

  static addfavourite(id,callback){
      favourite.fetch(fab => {
        fab.push(id);
        fs.writeFile(favouritefile, JSON.stringify(fab), callback);
      });
    };

  static removefavourite(id,callback){
    favourite.fetch(fab => {
      const filterhome = fab.filter(home => home._id !== id);
      fs.writeFile(favouritefile, JSON.stringify(filterhome), callback);
    });
  }
  

}
