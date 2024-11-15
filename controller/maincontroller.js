const favourite = require("../model/favourite");
const Register =require("./../model/home")

exports.getdetail=(req,res,next)=>{
  Register.fetch().then(home =>{
    res.render("index",{home:home,title:"Home"});
  });
 
}
exports.gethome=(req,res,next)=>{
  Register.fetch().then(home =>{
    res.render("home",{home:home,title:"Home"});
  });
 
}
exports.getid=(req,res,next)=>{
  const id=req.params.homeid;
  Register.findById(id).then(homeid =>{
     if(!homeid){
       return res.redirect("/");
     }
    res.render("homedetails",{home:homeid,title:"Home choose"});
  })

  
}
exports.getfabvourite=(req,res,next)=>{
  favourite.fetch().then(fabhome =>{
    console.log(fabhome);
    Register.fetch().then(home =>{
      fabhome= fabhome.map(fabid => fabid.homeId);
    
      const filterhome = home.filter(( home ) => fabhome.includes(home._id.toString()));
   
      res.render("fabvourite",{home:filterhome,title:"Fabvourite"});
    });
    
  })
  
 
}
exports.postfabvourite=(req,res,next)=>{
  const id=req.body.id;
  const fav =new favourite(id);
  fav.save().then(result =>{
    console.log(result, id, fav);
    res.redirect("/fabvourite");
  }).catch(err => console.log(err));
}

exports.postfabremove=(req,res,next)=>{
  const id=req.params.homeid;
  favourite.removefavourite(id).then(()  =>{
    res.redirect("/fabvourite");}

  )}
 
