const express = require("express");
const authrouter = express.Router();
const authcontroler  = require("../controller/authcontroller");


authrouter.get("/login", authcontroler.getlogin );

authrouter.post("/login", authcontroler.postlogin );
authrouter.post("/logout", authcontroler.postlogout );
authrouter.get("/signup", authcontroler.getsignup );
authrouter.post("/signup", authcontroler.postsignup );

module.exports=authrouter;