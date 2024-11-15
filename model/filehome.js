// const path =require("path");
// const fs =require("fs");
// const rootdir =require("./../util/path");
// const favourite = require("./favourite");


// const homfilepath=path.join(rootdir, "data", "homes.json");


// module.exports= class Register{
//   constructor(house,location,rating,url,Price){
//     this.housename=house;
//     this.location=location;
//     this.rating=rating;
//     this.photurl=url;
//     this.price=Price
 

//   }
//   save(callback){
//     Register.fetch(home =>{
//       if(this.id){
//         home = home.map(home => home.id === this.id ? this : home);
//         console.log(this.id);

//       }else{
//         this.id = Math.random().toString();
//         home.push(this);

//       }
//       // console.log(home);
//     fs.writeFile(homfilepath, JSON.stringify(home), callback);
//     })
//   }
//   static fetch(callback){
//     fs.readFile(homfilepath, (error,data)=>{
//       if(error){
//         callback([]);
//       }else{
//         callback(JSON.parse(data));
//       }
//     })

//   }

//   static findById(id, callback){
//     Register.fetch(home => {
//       const homeid = home.find(home => home.id === id);
//       callback(homeid);
//     });
//   }
//   static deleteById(id, callback) {
//   Register.fetch(home => {
//     const homeid = home.filter(home => home.id !== id);
//     console.log(homeid);
//     fs.writeFile(homfilepath, JSON.stringify(homeid), error=>{
//     if(error){
//       callback(error);
//     } else{
//       favourite.removefavourite(id,callback);
//     }

//     });
//   });
// }
// }

