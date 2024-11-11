const Register =require("./../model/home")
exports.getadd=(req,res,next)=>{
  console.log(req.url,req.method,req.body);
  res.render("card",{title:"Add data"});

};


exports.postadd=(req,res,next)=>{
  const {housename,location,rating,url,Price}=req.body;
  console.log(housename,location,rating,url,Price);
  const newresister = new Register(housename,location,rating,url,Price);
  newresister.save((error)=>{
      if(error){
        res.redirect('/');
      }else{
        res.render("succeful",{title:"successful data"});
      }
  });
}
