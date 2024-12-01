const express = require("express");
const routerhost =require("./Router/host/hostrouter");
const {routeradd} = require("./Router/host/hostadd");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./util/path");
const authrouter = require("./Router/authRouter");
const session = require("express-session");
const MongoDB_session = require("connect-mongodb-session");
const multer = require("multer");


const mongoose = require("mongoose");




const app= express();

const url="mongodb+srv://sohebaktar318:Soheb123@airbnddatabase.xnb2s.mongodb.net/airbnd?retryWrites=true&w=majority&appName=Airbnddatabase";



const MongoDB_Store = MongoDB_session(session);

const store = new MongoDB_Store({
  uri: url,
  collection: "sessions"
})



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    console.log(`Saving file to: ${req.destination}/${fileName}`);
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};



app.use(multer({storage,fileFilter}).single("photo"));


app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads",express.static(path.join(rootDir, "uploads")));



app.use(session({
  secret: "khan soheb akhtar",
  resave: false,
  saveUninitialized: true,
  store:store
}))


app.set("view engine", "ejs");
app.set("views","views");

app.use("/host", (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
})

app.use(routerhost);
app.use("/host",routeradd);
app.use(authrouter);

app.use( (req,res,next)=>{
  res.statusCode =404;
  res.render("404page",{title:"Page Doest not Exit", isLoggedIn: req.session.isLoggedIn});
  });




const PORT=3000;
mongoose.connect(url).then(() =>{
  console.log("connected");
  app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
  })
});
