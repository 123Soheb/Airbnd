const express = require("express");
const routerhost =require("./Router/host/hostrouter");
const {routeradd} = require("./Router/host/hostadd");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");
const authrouter = require("./Router/authRouter");

const mongoose = require("mongoose");




const app= express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));


app.use((req, res, next) => {
  req.isLoggedIn = req.get("Cookie").split("=")[1] === "true";
  next();
})

app.set("view engine", "ejs");
app.set("views","views");

app.use("/host", (req, res, next) => {
  if (!req.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
})

app.use(routerhost);
app.use("/host",routeradd);
app.use(authrouter);

app.use( (req,res,next)=>{
  res.statusCode =404;
  res.render("404page",{title:"Page Doest not Exit", isLoggedIn: req.isLoggedIn});
  });


  const url="mongodb+srv://sohebaktar318:Soheb123@airbnddatabase.xnb2s.mongodb.net/airbnd?retryWrites=true&w=majority&appName=Airbnddatabase";



const PORT=3000;
mongoose.connect(url).then(() =>{
  console.log("connected");
  app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
  })
});
