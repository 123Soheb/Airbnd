const express = require("express");
const authrouter = express.Router();
const authcontroler  = require("../controller/authcontroller");


authrouter.get("/login", authcontroler.getlogin );

authrouter.post("/login", authcontroler.postlogin );

module.exports=authrouter;