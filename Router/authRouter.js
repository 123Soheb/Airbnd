const express = require("express");
const authrouter = express.Router();
const authcontroler  = require("../controller/authcontroller");


authrouter.get("/login", authcontroler.getlogin );

authrouter.post("/login", authcontroler.postlogin );
authrouter.post("/logout", authcontroler.postlogout );
authrouter.get("/signup", authcontroler.getsignup );
authrouter.post("/signup", authcontroler.postsignup );
authrouter.get("/forgot-password", authcontroler.getforgot );
authrouter.post("/forgot-password", authcontroler.postforgot );
authrouter.get("/reset-password", authcontroler.getreset );
authrouter.post("/reset-password", authcontroler.postreset );

module.exports=authrouter;