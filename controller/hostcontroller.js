const Register =require("./../model/home")
exports.getadd=(req,res,next)=>{
  console.log(req.url,req.method,req.body);
  res.render("Edit",{title:"Add data",editing: false});

};


exports.postadd=(req,res,next)=>{
  const {housename,location,rating,url,Price,discription}=req.body;
  console.log(housename,location,rating,url,Price);
  const newresister = new Register(housename,location,rating,url,Price,discription);
  newresister.save().then((result)=>{
  
    res.redirect("/host/host-home");  
  }).catch((err)=>{
    console.log(err);
  })
}

exports.gethosthome =(req,res,next)=>{
  Register.fetch().then(home=>{
    res.render("home-added",{home:home,title:"Host home"});  
  })
}


exports.gethosthomeid=(req,res,next)=>{
  const id=req.params.homeid;
  const editing = req.query.editing === "true";
  console.log(editing ,id);
  
  if (!editing) {
    console.log("Editing flag not set properly");
    return res.redirect("/host/host-homes");
  }

  Register.findById(id).then((home) => {
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host-homes");
    }

    console.log(id, editing, home);
    res.render("Edit", {
      home: home,
      editing: editing,
      title: "Edit Your Home",
    });
  });
};

exports.posthosthomeedit=(req,res,next)=>{
 
  const {id,housename,location,rating,url,Price,discription}=req.body;
  const newresister = new Register(housename,location,rating,url,Price,discription,id);
  newresister.save().then((error)=>{
    if(error){
      console.log(error);
    }
    res.render("succeful",{title:"successful data"});
  });
}

exports.posthomedelete=(req,res,next)=>{
  const id=req.params.homeid;
  Register.deleteById(id).then(()=>{
   
      res.redirect("/host/host-home");
  })
}
