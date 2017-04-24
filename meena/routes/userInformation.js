var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var upload = require('./../bootclient/public/assets/js/multer');
var passport = require('./../bootclient/public/assets/js/passport');
var userCtr = require("./../app/controller/user");
router.post('/cart/:id', passport.authenticate('bearer', {
    session: false
}), userCtr.updateProduct);
router.post('/uploadImage', passport.authenticate('bearer', {
    session: false
}), upload.single('file'), userCtr.uploadImage);
router.get('/getAllCartFeedback', passport.authenticate('bearer', {
    session: false
}), passport.authenticate('bearer', {
    session: false
}), userCtr.getAllCartFeedback);
router.get('/cartDetail', passport.authenticate('bearer', {
    session: false
}), passport.authenticate('bearer', {
    session: false
}), userCtr.getAllCart);
router.get('/getAllFeedbacks', passport.authenticate('bearer', {
    session: false
}), passport.authenticate('bearer', {
    session: false
}), userCtr.getAllFeedbacks);
router.get('/allFeedback', passport.authenticate('bearer', {
    session: false
}), passport.authenticate('bearer', {
    session: false
}), userCtr.getAllFeedback);
router.post('/addFeedback/:id', passport.authenticate('bearer', {
    session: false
}), passport.authenticate('bearer', {
    session: false
}), userCtr.addFeedback);
router.delete('/deleteCart/:id', passport.authenticate('bearer', {
    session: false
}), passport.authenticate('bearer', {
    session: false
}), userCtr.deleteCart);
router.get('/getCartFeedback/:id', passport.authenticate('bearer', {
    session: false
}), passport.authenticate('bearer', {
    session: false
}), userCtr.getCartFeedback);
router.get('/userCart/:id', userCtr.getCart);
router.get('/loggedUser', passport.authenticate('bearer', {
    session: false
}), userCtr.getLoggedUser);
router.get('/getCartDetails', passport.authenticate('bearer', {
    session: false
}), userCtr.getaCart);
router.post('/addCart', passport.authenticate('bearer', {
    session: false
}), userCtr.addCart);
router.get('/logincheck', passport.authenticate('bearer', {
    session: false
}), userCtr.logincheck);
router.get('/getUser', passport.authenticate('bearer', {
    session: false
}), userCtr.getUser);
router.get('/', passport.authenticate('bearer', {
    session: false
}), userCtr.getAllUsers);
router.get('/:id', passport.authenticate('bearer', {
    session: false
}), userCtr.getaUsers);
router.post('/', userCtr.addUsers);
router.put('/:id', passport.authenticate('bearer', {
    session: false
}), userCtr.updateUser);
router.delete('/:id', passport.authenticate('bearer', {
    session: false
}), passport.authenticate('bearer', {
    session: false
}), userCtr.deleteUser);
router.get('/user', passport.authenticate('bearer', {
    session: false
}), userCtr.getPage);
router.post('/login', userCtr.login);
module.exports = router;