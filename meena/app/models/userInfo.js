var userModel = require("./../models/user");
exports.checkUser = function(req, res)
{
 	var userName="mina";
 	var password="mina123";
  if((req.body.userName===userModel.userName)&&(req.body.password===userModel.password))
  {
  	console.log(" matched");
  }
  else
  {
  	console.log(" not matched");
  }

}



