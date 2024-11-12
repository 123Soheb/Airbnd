const express =require("express");
const conthost=require("../../controller/hostcontroller");

const routeradd =express();
routeradd.get("/add-home",conthost.getadd);
routeradd.post("/add-home",conthost.postadd);
routeradd.get("/host-home",conthost.gethosthome);
routeradd.get("/host-home/:homeid",conthost.gethosthomeid);
routeradd.post("/edit-home",conthost.posthosthomeedit);

exports.routeradd=routeradd;