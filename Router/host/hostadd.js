const express =require("express");
const conthost=require("../../controller/hostcontroller");

const routeradd =express();
routeradd.get("/host/add-home",conthost.getadd);
routeradd.post("/host/add-home",conthost.postadd);

exports.routeradd=routeradd;
