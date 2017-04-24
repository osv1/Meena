var express = require('express');
var router = express.Router();
var loginCtrl = require("./../app/controller/userInfo");
router.post('/', loginCtrl.checkUser);

module.exports = router;
