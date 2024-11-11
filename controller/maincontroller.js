const favourite = require("../model/favourite");
const Register =require("./../model/home")

exports.getdetail=(req,res,next)=>{
  Register.fetch(home =>{
    res.render("index",{home:home,title:"Home"});
  });
 
}
exports.gethome=(req,res,next)=>{
  Register.fetch(home =>{
    res.render("home",{home:home,title:"Home"});
  });
 
}
exports.getid=(req,res,next)=>{
  const id=req.params.homeid;
  Register.findById(id,homeid =>{
     if(!homeid){
       return res.redirect("/");
     }
    res.render("homedetails",{home:homeid,title:"Home choose"});
  })

  
}
exports.getfabvourite=(req,res,next)=>{
  favourite.fetch(fabhome =>{
    Register.fetch(home =>{
      const filterhome = home.filter(({ id }) => fabhome.some(fab => fab.id === id));
   
      res.render("fabvourite",{home:filterhome,title:"Fabvourite"});
    });
    
  })
  
 
}
exports.postfabvourite=(req,res,next)=>{
  const id=req.body;
  favourite.addfavourite(id,(error)=>{
    if(error){
      console.log(error);
    }
    console.log("done");
  });
  res.redirect("/fabvourite");
}