var express = require('express');
var router = express.Router();
var upload = require('./../bootclient/public/assets/js/multer');
var fs = require('fs');
var path=require('path');
var passport=require('./../bootclient/public/assets/js/passport');
var productCtrl = require("./../app/controller/product");
router.get('/sortingOnPrice',passport.authenticate('bearer', { session: false }),productCtrl.sortingOnPrice);
router.get('/:id/productCategory',passport.authenticate('bearer', { session: false }),productCtrl.getSingleProductCategory);
// router.post('/:id/productList',passport.authenticate('bearer', { session: false }), productCtrl.pushCategoryProduct );
router.get('/category',passport.authenticate('bearer', { session: false }),productCtrl.getCategory);
router.post('/:id/category',passport.authenticate('bearer', { session: false }), productCtrl.addProductCategory);
router.get('/allCategory',passport.authenticate('bearer', { session: false }),productCtrl.getAllCategory);
router.post('/addCategory',passport.authenticate('bearer', { session: false }),productCtrl.addcategory);
router.post('/uploadProductImage',passport.authenticate('bearer', { session: false }),upload.single('file'),productCtrl.uploadImage);
router.post('/:id',passport.authenticate('bearer', { session: false }), productCtrl.updateProduct);
router.get('/Feedback/:id',passport.authenticate('bearer', { session: false }),passport.authenticate('bearer', { session: false }),productCtrl.getFeedback);
router.post('/addFeedback/:id',passport.authenticate('bearer', { session: false }),passport.authenticate('bearer', { session: false }),productCtrl.addFeedback);
// router.get('/getAllCartFeedback',passport.authenticate('bearer', { session: false }),passport.authenticate('bearer', { session: false }),productCtrl.getAllCartFeedback);
router.get('/getCartFeedback/:id',passport.authenticate('bearer', { session: false }),passport.authenticate('bearer', { session: false }),productCtrl.getCartFeedback);
router.get('/getComment',passport.authenticate('bearer', { session: false }), productCtrl.getComment);
router.get('/getMenClothProduct',passport.authenticate('bearer', { session: false }), productCtrl.getAllMenProduct);
router.get('/getAllWomenClothProduct',passport.authenticate('bearer', { session: false }),productCtrl.getAllWomenClothProduct);
router.get('/getAllCosmeticProduct',passport.authenticate('bearer', { session: false }), productCtrl.getAllCosmeticProduct);
router.get('/getAllElectronicProduct',passport.authenticate('bearer', { session: false }), productCtrl.getAllElectronicProduct);
router.get('/getAllComplaints',passport.authenticate('bearer', { session: false }), productCtrl.getAllComplaints);
router.get('/',passport.authenticate('bearer', { session: false }), productCtrl.getAllProduct);
router.get('/:id', productCtrl.getProducts);
router.post('/',productCtrl.addProduct);
router.post('/complaint/:id', passport.authenticate('bearer', { session: false }),productCtrl.productComplaint);
router.delete('/:id',passport.authenticate('bearer', { session: false }), productCtrl.deleteProduct);
module.exports = router;