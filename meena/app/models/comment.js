var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    feedback: [{type:String,required: true}] 
});
var comment = mongoose.model('comment', commentSchema)
module.exports = comment;
