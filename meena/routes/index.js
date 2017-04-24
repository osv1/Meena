var express = require('express');
var router = express.Router();
var productRout = require("./product");
var categoryRout = require("./category");
var userRout = require("./userInformation");
router.get("/", function(req, res){
	res.sendFile("client/index.html", {root: __dirname})
})
router.use('/product',productRout);
router.use('/category',categoryRout);
router.use('/userInformation',userRout);
module.exports = router;



