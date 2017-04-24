var mongoose = require("mongoose");
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var categorySchema = new Schema({
    categoryName:{type:String,required: true},  
    categoryImage:{type:String},  
    url:{type:String},
    subcategory:{type:String},
    level:{type:Number}
});
var category = mongoose.model('category', categorySchema)
module.exports =category;