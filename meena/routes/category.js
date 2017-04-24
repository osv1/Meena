var express = require('express');
var router = express.Router();
var upload = require('./../bootclient/public/assets/js/multer');
var fs = require('fs');
var path=require('path');
var passport=require('./../bootclient/public/assets/js/passport');
var categoryCtrl = require("./../app/controller/category");
router.get('/allCategory',passport.authenticate('bearer', { session: false }), categoryCtrl.getAllCategory);
router.post('/addProductCategory',passport.authenticate('bearer', { session: false }), categoryCtrl.addcategory);
module.exports = router;