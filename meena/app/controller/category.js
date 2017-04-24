var productModel = require("./../models/product");
var categoryModel = require("./../models/category");
var express = require('express');
var formidable = require('formidable');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
http = require('http');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');
exports.getAllCategory = function(req, res) {
        categoryModel.find({}).exec(function(err, product) {
            if (err) {
                res.json({
                    code: 400,
                    message: "Error occurred while fetching product"
                });
            } else if (product && product.length) {
                res.json({
                    code: 200,
                    data: product
                })
            } else {
                res.json({
                    code: 404,
                    message: "No records found"
                })
            }

        });
}
exports.addcategory = function(req, res) {
    console.log('hello');
    var category = new categoryModel(req.body);
    category.save(function(err) {
        console.log(category);
        console.log(err);
        if (err) {
            res.json({
                code: 404,
                message: "Error"
            })

        } else {
            res.json({
                code: 200,
                data: category
            })
        }
    });
}