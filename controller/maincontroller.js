const path =require("path");

const User = require("../model/user");
const Home =require("./../model/home")

const rootDir = require("../util/path");

exports.getdetail=(req,res,next)=>{
  Home.find().then(home =>{
    res.render("index",{home:home,title:"Home",  isLoggedIn: req.session.isLoggedIn, user: req.session.user});
  });
 
}
exports.gethome=(req,res,next)=>{
  Home.find().then(home =>{
    res.render("home",{home:home,title:"Home" , isLoggedIn: req.session.isLoggedIn, user: req.session.user});
  });
 
}
exports.getid=(req,res,next)=>{
  const id=req.params.homeid;
  Home.findById(id).then(homeid =>{
     if(!homeid){
       return res.redirect("/");
     }
    res.render("homedetails",{home:homeid, title:"Home choose",  isLoggedIn: req.session.isLoggedIn,user: req.session.user});
  })

  
}
exports.getfabvourite=async (req,res,next)=>{
   const userId=req.session.user._id;
   try{
     const user = await User.findById({_id : userId}).populate("favouritesHome");
     console.log(user);
     res.render("fabvourite",{home:user.favouritesHome, title:"Fabvourite",  isLoggedIn: req.session.isLoggedIn,user: req.session.user});;
   }catch(err){
     console.log(err);
     
   }  
 
}
exports.postfabvourite=async (req,res,next)=>{
  const homeId=req.body.id;
  const userId=req.session.user._id;
  try{
    const user = await User.findOne({_id : userId})
    if(!user.favouritesHome.includes(homeId)){
      user.favouritesHome.push(homeId);
      await user.save();
      res.redirect("/fabvourite");
    }else{
      res.redirect("/fabvourite");
    }

  }catch(err){
    console.log(err);
    res.redirect("/fabvourite");
  }

  
}
 

exports.postfabremove=(req,res,next)=>{
  const homeId=req.params.homeid;
  const userId=req.session.user._id;
  User.findById(userId).then(user => {
    user.favouritesHome=user.favouritesHome.filter(home => home.toString() !== homeId);
    return user.save(); 
  }).then(() => {
    res.redirect("/fabvourite");
  }).catch(err => {
    console.log(err);
    res.redirect("/fabvourite");
  })
}


exports.getrules=(req,res,next)=>{
  // const id=req.params.homeid;
  // console.log(id);
  const rulesFiles ="Airbnb-Rules.pdf";
  const filePath=path.join(rootDir,"rules",rulesFiles);
  // res.sendFile(filePath);
  res.download(filePath, "Rules.pdf");



 }