var productModel = require("./../models/product");
var commentModel = require("./../models/comment");
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
var sortBy = require('sort-by');
exports.getComment = function(req, res) {
    productModel.find({}).populate("comment").exec(function(err, product) {
        if (err) {
            res.json({
                code: 400,
                message: "Error occurred while fetching product"
            });
        } else {
            res.json({
                code: 200,
                data: product
            })
        }
    });
}
exports.getCategory = function(req, res) {
     productModel.find({}).populate("category").exec(function(err, product) {
        if (err) {
            res.json({
                code: 400,
                message: "Error occurred while fetching product gggggg"
            });
        } else {
            res.json({
                code: 200,
                data: product
            })
        }
    });
}
exports.getSingleProductCategory = function(req, res) {
     productModel.findById({'_id': req.params.id}).populate("category").exec(function(err, product) {
        if (err) {
            res.json({
                code: 400,
                message: "Error occurred while fetching product gggggg"
            });
        } else {
            res.json({
                code: 200,
                data: product
            })
        }
    });
}
exports.addcategory = function(req, res) {
    var product = new productModel(req.body);
    product.save(function(err) {
        // console.log(category);
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
exports.sortingOnPrice = function(req, res) {
        productModel.find({}).sort({name: 1 }).toArray(function (err, items) {
        if(err)
        {
            console.log(err);
        }else{
            res.json(items);
        }
    });
        // if (err) {
        //     res.json({
        //         code: 400,
        //         message: "Error occurred while fetching product"
        //     });
        // } else if (product && product.length) {
        //     res.json({
        //         code: 200,
        //         data: product
        //     });
        //     console.log('ddf');
        // } else {
        //     res.json({
        //         code: 404,
        //         message: "No records found"
        //     })
        // }

    // });
    console.log("jhgdjg");
}
exports.getCartFeedback = function(req, res) {
    productModel.findById({
        '_id': req.params.id
    }).exec(function(err, product) {
        if (err) {
            res.json({
                code: 400,
                message: "Error occurred while fetching product"
            });
        } else {
            res.json({
                code: 200,
                data: product
            })

        }
     });
}
// exports.pushCategoryProduct = function(req, res) {
//     console.log("inside cart");
//     var category = new categoryModel(req.body);
//     console.log(category);
//     category.save(function(err)
//     {
//          productModel.update({_id: req.params.id}, { $push: {category: category} }, function(err, info)
//         {
//           if(err)
//             { 
//                 res.json({code: 404, message: "yrryytty:"+err});
//             }
//         else{
//                 res.json({code: 200, data: info });
//             }
//        });  
//    });

// }
exports.addProductCategory = function(req, res) {
    console.log("inside cart");
    var category = new categoryModel(req.body);
    console.log(category);
    console.log(req.params.id);
    category.save(function(err) {
        productModel.update({
            _id: req.params.id
        }, {
            $push: {
                category: category
            }
        }, function(err, info) {
            if (err) {
                res.json({
                    code: 404,
                    message: "ssdds"+err
                })

            } else {
                res.json({
                    code: 200,
                    data: info
                })
            }
        })
    })
}
exports.addFeedback = function(req, res) {
    console.log("inside cart");
    var comment = new commentModel(req.body);
    comment.save(function(err) {
        productModel.update({
            _id: req.params.id
        }, {
            $push: {
                comment: comment
            }
        }, function(err, info) {
            if (err) {
                res.json({
                    code: 404,
                    message: err
                })

            } else {
                res.json({
                    code: 200,
                    data: info
                })
            }
        })
    })
}
exports.addCart = function(req, res)
{   console.log("inside cart");
    var cart = new cartModel(req.body);
    console.log("hello");
    console.log(cart);
    cart.save(function(err)
    {
         ProductModel.update({_id: req.user.id}, { $push: {cart: cart} }, function(err, info)
        {
          if(err)
            { res.json({code: 404, message: err})
              
            }
        else{
                res.json({code: 200, data: info });
            }
       })  
   })
}
exports.getAllProduct = function(req, res) {
    productModel.find({}).exec(function(err, product) {
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

exports.getAllComplaints = function(req, res) {
    productModel.find({
        complaint: {
            $ne: null
        }
    }).exec(function(err, product) {
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
exports.getAllElectronicProduct = function(req, res) {
    productModel.find({
        categoryName: {
            $eq: "Electronic item"
        }
    }).exec(function(err, product) {
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
exports.getAllMenProduct = function(req, res) {
    productModel.find({
        categoryName: {
            $eq: "Men cloth"
        }
    }).exec(function(err, product) {
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
exports.getAllCosmeticProduct = function(req, res) {
    productModel.find({
        categoryName: {
            $eq: "cosmetics"
        }
    }).exec(function(err, product) {
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
exports.getAllWomenClothProduct = function(req, res) {
    productModel.find({
        categoryName: {
            $eq: "Women Cloth"
        }
    }).exec(function(err, product) {
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
exports.getProducts = function(req, res) {
    var id = req.params.id;
    productModel.findById({
        "_id": id
    }).exec(function(err, user) {
        if (err) {
            res.json({
                code: 400,
                message: "Error occurred while fetching product information"
            });
        } else {
            res.json({
                code: 200,
                data: user
            })
        }


    });
}
exports.getFeedback = function(req, res) {
    commentModel.findById({
        '_id': req.params.id
    }).exec(function(err, user) {
        if (err) {
            res.json({
                code: 400,
                message: "Error occurred while fetching product information"
            });
        } else {
            res.json({
                code: 200,
                data: user
            })
        }


    });
}

exports.addProduct = function(req, res) {
    var product = new productModel(req.body);
    product.save(function(err) {
        console.log(product);
        console.log(err);
        if (err) {
            res.json({
                code: 404,
                message: "Error"
            })

        } else {
            res.json({
                code: 200,
                data: product
            })
        }
    });
}
exports.updateProduct = function(req, res) {
    productModel.update({
        _id: req.params.id
    }, {
        $set: req.body
    }, function(err, info) {
        if (err) {
            res.json({
                code: 404,
                message: err
            })

        } else {
            console.log(info);
            res.json({
                code: 200,
                data: info,
                mesage: "Successfully updated product"
            })
            console.log('df');
        }
    })
}
exports.deleteProduct = function(req, res) {
    productModel.remove({
        _id: req.params.id
    }).exec(function(err, product) {
        if (err) {
            res.json({
                code: 404,
                message: "No records found"
            });
        } else {
            res.json({
                code: 200,
                message: "successfully deleted products"
            })
        }
    });
}
exports.productComplaint = function(req, res) {

    productModel.update({
        _id: req.params.id
    }, {
        $set: req.body
    }, function(err, info) {
        if (err) {
            res.json({
                code: 404,
                message: err
            })

        } else {
            res.json({
                code: 200,
                data: info
            })
        }
    })
}
exports.uploadImage = function(req, res, next) {
    console.log(1);
    var file = 'bootclient/app/image/' + req.file.filename;
    fs.rename(req.file.path, file, function(err) {
        console.log(2);
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log(file, "file")
            productModel.update({
                '_id': req.product.id
            }, {
                $set: {
                    productImage: req.file.filename
                }
            }, function(err, resp) {
                console.log(file);
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.json({
                        message: 'File uploaded successfully',
                        filename: req.file.filename
                    });
                }
            })
        }
    });
}