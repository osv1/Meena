var jsonwebtoken = require('jsonwebtoken');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;
passport.use(new Strategy(
  function(token, callback) {
	jsonwebtoken.verify(token, 'shhhhh', function(err, decoded) {
		if(err){
			console.log(err);
			callback('Invalid token');
		}else{
			console.log(decoded)
			callback(false,decoded);
		}
	});
}));
module.exports = passport;