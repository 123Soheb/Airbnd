const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;


const url="mongodb+srv://sohebaktar318:Soheb123@airbnddatabase.xnb2s.mongodb.net/?retryWrites=true&w=majority&appName=Airbnddatabase";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(url).then((client) => {
      console.log("Connected to Database");
      _db = client.db("airbnd");
      callback();
    })  
    .catch((err) => {
      console.log(err);  
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};  

  

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

