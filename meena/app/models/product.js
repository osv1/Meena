var mongoose = require("mongoose");
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var commentModel = require("./comment");
var categoryModel = require("./category");
var productSchema = new Schema({
    price:{type:Number,required: true},
    details:{type:String,required: true},  
    createdDate:{type:Date,default:Date.now},  
    status:{type:Number,required: true},
    categoryName:{type: String},
    name:{type: String},
    id:{type: String,required: true},
    complaint: [{type:String}],
    offer:{type:String},
    quantity:Number,
    offerValidTill:Date,
    saleAmount:Number,
    productImage: String,
    comment: [{
                type: ObjectId,
                ref: "comment"
          }]
          ,
    category: {
                type: ObjectId,
                ref: "category"
          }  
});
var product = mongoose.model('product', productSchema)
module.exports = product;
