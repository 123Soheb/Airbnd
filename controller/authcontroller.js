exports.getlogin=(req,res,next)=>{
  console.log(req.url,req.method,req.body);
  res.render("login",{title:"Login", isLoggedIn:false});
};  
exports.postlogin=(req,res,next)=>{
  console.log(req.url,req.session.isLoggedIn,req.body);
  req.session.isLoggedIn=true;
  res.redirect("/");
 
}


exports.postlogout=(req,res,next)=>{
  console.log(req.url,req.session.isLoggedIn,req.body);
  req.session.destroy();
  res.redirect("/login");
 
}

exports.getsignup=(req,res,next)=>{
  console.log(req.url,req.method,req.body);
  res.render("signup",{title:"Signup", isLoggedIn:false});
};

exports.postsignup =(req,res,next)=>{
  console.log(req.url,req.session.isLoggedIn,req.body);
  res.redirect("/login");
 
}