var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
ObjectId = Schema.ObjectId;
var cartModel = require("./cart");
var mongoosePaginate = require('mongoose-paginate');
var UserSchema = new  Schema({
   firstName:{type:String, required: true},
   email:String,
   mobileNumber:{type:Number,required: true},  		  		
   userName:{type:String, required: true},
   password: {type:Schema.Types.Mixed,required:true},
   userprofile: String,
   cart: [{
                type: ObjectId,
                ref: "cart"
          }]
});
var User = mongoose.model('user', UserSchema);
module.exports = User;

