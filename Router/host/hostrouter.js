const express =require("express");
const routerhost=express();
const maincontroller=require("../../controller/maincontroller")

routerhost.get("/",maincontroller.getdetail);
routerhost.get("/home",maincontroller.gethome);
routerhost.get("/home/:homeid",maincontroller.getid);
routerhost.get("/fabvourite",maincontroller.getfabvourite);
routerhost.post("/getfabvourite",maincontroller.postfabvourite);
routerhost.post("/favourite-remove/:homeid",maincontroller.postfabremove);

module.exports =routerhost;