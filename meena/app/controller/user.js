var userModel = require("./../models/user");
var jsonwebtoken = require('jsonwebtoken');
var multer  = require('multer');
var fs = require('fs');
var path=require('path');
var docsPerPage = 10;
var pageNumber = 0;
var cartModel = require("./../models/cart");
var commentModel = require("./../models/comment");
exports.getaCart = function(req, res){
  userModel.findById({'_id':req.user.id}).populate("cart").exec(function(err, product)
 {
   if(err)
   {
      res.json({code: 400, message: "Error occurred while fetching product"});
    }
    else 
    {
        res.json({code: 200, data: product})

    }


  });
}
exports.updateProduct = function(req, res)
{     
       userModel.findById({_id: req.user.id}).exec(function(err)
        {  
            cartModel.update({_id: req.params.id}, { $set:req.body }, function(err,info)
            {       
                  if(err)
                    { res.json({code: 404, message: err})

                    }
                else{    
                        console.log(info);
                        res.json({code: 200, data: info ,mesage:"hellloo"})
                        console.log('df');
                    }
            })  
       })    
}
exports.deleteCart = function(req, res) {
 
      userModel.update({_id: req.user.id},{ $pull: {'cart':req.params.id} }, function(err, info)
       {  
            if (err) {
                res.json({
                    code: 404,
                    message: "Error happened while deleting"
                });

            } else {
                res.json({
                    code: 200,
                    message: "Successful deletion happened dfg "
                })
            }

        });
}
exports.getAllCart = function(req, res){
  userModel.find({}).populate("cart").exec(function(err, product)
 {
   if(err)
   {
      res.json({code: 400, message: "Error occurred while fetching product"});
    }
    else if(product && product.length)
    {
        res.json({code: 200, data: product})
    }
    else
    {
          res.json({code: 404, message: "No records found"})
    }

  });
}
exports.getCartFeedback = function(req, res){
  cartModel.findById({'_id':req.params.id}).exec(function(err, product)
 {
   if(err)
   {
      res.json({code: 400, message: "Error occurred while fetching product"});
    }
    else 
    {
        res.json({code: 200, data: product})

    }


  });
}
exports.getAllCartFeedback = function(req, res){
  cartModel.find().exec(function(err, product)
 {
   if(err)
   {
      res.json({code: 400, message: "Error occurred while fetching product"});
    }
    else 
    {
        res.json({code: 200, data: product})

    }


  });
}
exports.getAllFeedback = function(req, res){
  cartModel.find({}).populate("comment").exec(function(err, product)
 {
   if(err)
   {
      res.json({code: 400, message: "Error occurred while fetching product"});
    }
    else if(product && product.length)
    {
        res.json({code: 200, data: product})
    }
    else
    {
          res.json({code: 404, message: "No records found"})
    }

  });
}

exports.addCart = function(req, res)
{   console.log("inside cart");
    var cart = new cartModel(req.body);
    console.log("hello");
    console.log(cart);
    cart.save(function(err)
    {
         userModel.update({_id: req.user.id}, { $push: {cart: cart} }, function(err, info)
        {
          if(err)
            { res.json({code: 404, message: err})
              
            }
        else{
                res.json({code: 200, data: info })
                // console.log(cart)
            }
       })  
   })

}

exports.addFeedback = function(req, res)
{   console.log("inside cart");
    var comment = new commentModel(req.body);
    comment.save(function(err)
    {
         cartModel.update({_id: req.params.id}, { $push: {comment: comment} }, function(err, info)
        {
          if(err)
            { res.json({code: 404, message: err})

            }
        else{
                res.json({code: 200, data: info })
            }
       })  
   })
}
exports.getCart = function(req, res)
{   console.log("inside cart");
     var id = req.params.id;
 
    cartModel.find({"_id": id}).exec(function(err, user) {
        if (err) {
            res.json({
                code: 400,
                message: "Error occurred while fetching user information"
            });
        } else {
            res.json({
                code: 200,
                data: user
            })
        }


    });
}
exports.getUser = function(req, res) {
    console.log('login user', req.user);

    var a = req.query.pageno;
    pageNumber = a;
    UserModel.findPaginated({}, function(err, userInfo) {
        if (err) throw err;
        else {

            res.json({
                code: 200,
                message: "data retrieved",
                data: userInfo.documents
            });
        }
    }, docsPerPage, pageNumber)

}
exports.getAllUsers = function(req, res) {
    userModel.find({}).exec(function(err, user) {
        if (err) {
            res.json({
                code: 400,
                message: "Error occurred while fetching user information"
            });
        } else if (user && user.length) {
            res.json({
                code: 200,
                data: user
            })
        } else {
            res.json({
                code: 404,
                message: "No records found"
            })
        }

    });
}
exports.getAllFeedbacks = function(req, res) {

    commentModel.find({}).exec(function(err, user) {
        if (err) {
            res.json({
                code: 400,
                message: "Error occurred while fetching user information"
            });
        } else if (user && user.length) {
            res.json({
                code: 200,
                data: user
            })
        } else {
            res.json({
                code: 404,
                message: "No records found"
            })
        }

    });
}
exports.getaUsers = function(req, res) {
    var id = req.params.id;
    userModel.find({
        "_id": id
    }).exec(function(err, user) {
        if (err) {
            res.json({
                code: 400,
                message: "Error occurred while fetching user information"
            });
        } else {
            res.json({
                code: 200,
                data: user
            })
        }


    });
}
exports.getLoggedUser = function(req, res) {
    var id = req.user.id;
    console.log(id);
    userModel.findById({'_id':req.user.id}).exec(function(err, user) {
        console.log(user);
        if (err) {
            console.log(err);
            res.json({
                code: 400,
                message: "Error occurred while fetching user informationgttygrh",
                data:err
            });
        } else {
            res.json({
                code: 200,
                data: user
            })
        }


    });
}
exports.addUsers = function(req, res) {
    console.log("ERROR")
    var user = new userModel(req.body);
    user.save(function(err) {
        if (err) {
            res.json({
                code: 404,
                message: "Check entered fields once again"
            })
        } else {
            res.json({
                code: 200,
                data: user
            })
        }
    });
}

exports.updateUser = function(req, res) {
    console.log("updateuser", req.params.id, req.body);
    userModel.update({
        _id: req.params.id
    }, {
        $set: req.body
    }, function(err, user) {
        if (err) {
            res.json({
                code: 404,
                message: "Error while updating"
            });

        } else {
            res.json({
                code: 200,
                data: user
            })
        }
    })
}
exports.deleteUser = function(req, res) {
    userModel.remove({
        _id: req.params.id
    }).exec(function(err, user) {
        if (err) {
            res.json({
                code: 404,
                message: "Error happened while deleting"
            });

        } else {
            res.json({
                code: 200,
                message: "Successful deletion happened"
            })
        }
    });
}
exports.getPage = function(req, res) {
    var pg = req.query.pageno || 1;
    var ps = req.query.pagesize || 3;
    var pageNo = Number(pg);
    var pageSize = Number(ps);
    console.log(typeof(pg) + " " + typeof(ps));
    console.log(typeof(pageno));
    userModel.find().skip(pageNo).limit(pageSize).exec(function(err, user) {
        if (err) {
            res.json({
                code: 400,
                message: "Error occurred while fetching user information"
            });
        } else {
            res.json({
                code: 200,
                data: user
            });
        }
    });
}

exports.logincheck= function(req, res){
  res.json({code:200,message:"Ok"});
}

exports.login = function(req, res) {
    console.log('inside login', req.body)
    userModel.findOne({
        "userName": req.body.username,
        "password": req.body.password
    }).exec(function(err, users) {
        var id;
        console.log(users);
        if (users) {
            console.log("here");
            var payload = {
                id: users._id
            };
            console.log(payload);
            var token = jsonwebtoken.sign(payload, 'shhhhh');
            console.log("token" + token);
            res.json({
                code: 200,
                message: 'Succesfully Logged in',
                data: {
                    token: token
                }
            });

        } else {
            res.json({
                code: 404,
                message: "Check Credentials"
            });
        }
    });

}
exports.uploadImage= function(req,res,next){
      console.log(1);
      var file = 'bootclient/app/image/' + req.file.filename;
      fs.rename(req.file.path, file, function(err) {
        console.log(2);
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          console.log(file,"file")
           userModel.update({'_id':req.user.id}, { $set: {userprofile:req.file.filename} }, function(err, resp){
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