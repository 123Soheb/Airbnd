const express = require("express");
const routerhost =require("./Router/host/hostrouter");
const {routeradd} = require("./Router/host/hostadd");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");



const app= express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

app.set("view engine", "ejs");
app.set("views","views");

app.use(routerhost);
app.use("/host",routeradd);

app.use( (req,res,next)=>{
  res.statusCode =404;
  res.render("404page",{title:"Page Doest not Exit"});
  });





const PORT=3000;
app.listen(PORT, ()=>{
  console.log(`http://localhost:${PORT}`);
})