const favourite = require("../model/favourite");
const Home =require("./../model/home")

exports.getdetail=(req,res,next)=>{
  Home.find().then(home =>{
    res.render("index",{home:home,title:"Home",  isLoggedIn: req.session.isLoggedIn,});
  });
 
}
exports.gethome=(req,res,next)=>{
  Home.find().then(home =>{
    res.render("home",{home:home,title:"Home" , isLoggedIn: req.session.isLoggedIn,});
  });
 
}
exports.getid=(req,res,next)=>{
  const id=req.params.homeid;
  Home.findById(id).then(homeid =>{
     if(!homeid){
       return res.redirect("/");
     }
    res.render("homedetails",{home:homeid, title:"Home choose",  isLoggedIn: req.session.isLoggedIn,});
  })

  
}
exports.getfabvourite=(req,res,next)=>{
  favourite.find().populate("homeId").then(fabhome =>{
    console.log(fabhome);
    fabhome= fabhome.map(fabid => fabid.homeId);
    
   
      res.render("fabvourite",{home:fabhome, title:"Fabvourite",  isLoggedIn: req.session.isLoggedIn,});
    });
    
  
 
}
exports.postfabvourite=(req,res,next)=>{
  const homeId=req.body.id;
  console.log(homeId);
  favourite.findOne({homeId}).then(existfavid =>{
    if(existfavid){
      return res.redirect("/fabvourite");
    }
     const fav =new favourite({homeId});
    fav.save().then(result =>{
      res.redirect("/fabvourite");
    });
   
  }
  )
}
 

exports.postfabremove=(req,res,next)=>{
  const homeId=req.params.homeid;
  favourite.findOneAndDelete({homeId}).then(()  =>{
    res.redirect("/fabvourite");}

  )}
 
