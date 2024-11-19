const Home =require("./../model/home")
exports.getadd=(req,res,next)=>{
  console.log(req.url,req.method,req.body);
  res.render("Edit",{title:"Add data", editing: false,  isLoggedIn: req.session.isLoggedIn,});

};


exports.postadd=(req,res,next)=>{
  const {housename,location,rating,photurl,price,discription}=req.body;
  console.log(housename,location,rating,photurl,price,discription);
  const newresister = new Home({housename,location,rating,photurl,price,discription});
  newresister.save().then((result)=>{
  
    res.redirect("/host/host-home");  
  }).catch((err)=>{
    console.log(err);
  })
}

exports.gethosthome =(req,res,next)=>{
  Home.find().then(home=>{
    res.render("home-added",{home:home,title:"Host home" , isLoggedIn: req.session.isLoggedIn});  
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

  Home.findById(id).then((home) => {
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host-homes");
    }

    console.log(id, editing, home);
    res.render("Edit", {
      home: home,
      editing: editing,
      title: "Edit Your Home",
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};

exports.posthosthomeedit=(req,res,next)=>{
 
  const {id,housename,location,rating,photurl,price,discription}=req.body;
  console.log(id,housename,location,rating,photurl,price,discription);
  Home.findById(id).then((home)=>{
    home.housename=housename;
    home.location=location;
    home.rating=rating;
    home.photurl=photurl;
    home.price=price;
    home.discription=discription;
    return home.save();
  }).then((result)=>{
    res.redirect("/host/host-home");
  })
  
}

exports.posthomedelete=(req,res,next)=>{
  const id=req.params.homeid;
  Home.findByIdAndDelete(id).then(()=>{
   
      res.redirect("/host/host-home");
  })
}
