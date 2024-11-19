exports.getlogin=(req,res,next)=>{
  console.log(req.url,req.method,req.body);
  res.render("login",{title:"Login", isLoggedIn:false});
};  
exports.postlogin=(req,res,next)=>{
  console.log(req.url,req.isLoggedIn,req.body);
  res.cookie("isLoggedIn",true);
  res.redirect("/");
 
}