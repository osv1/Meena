var mongoose = require("mongoose");
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
ObjectId = Schema.ObjectId;
var commentModel = require("./comment");
var cartSchema = new Schema({
    name: {type:String,required: true},
    id: {type:String,required: true},
    price:{type:Number,required: true},
    details:{type:String,required: true},
    quantity:Number, 
    selectedqty:Number,
      comment: [{
                type: ObjectId,
                ref: "comment"
          }]
});
var cart = mongoose.model('cart', cartSchema)
module.exports = cart;
