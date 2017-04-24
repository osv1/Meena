var userModel = require("./../models/user");
exports.checkUser = function(req, res)
{
 	var userName="mina";
 	var password="mina123";
 	//var user= new userModel();
 		//console.log(userModel.userName);
  if((req.body.userName===userModel.userName)&&(req.body.password===userModel.password))
  {
  	console.log(" matched");
  	//res.json({code:200,message:"username ,password matched"});
  }
  else
  {

  	console.log(" not matched");
  	//res.json({code:404,message:"username or password not matched"})
  }

}


  //var name=req.body.userName;
  //var password=req.body.password;

/*userModel.find().exec(function(err,user)
         {
              if()
              {
              	res.json({code:200,message:"username ,password matched"})
              	
              }
              	else
              	{
              		res.json({code:404,message:"username or password not matched"})
              	}

           });
}
*/



