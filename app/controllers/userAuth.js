var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var secret = 'ttv7yttvytftfftytftt';
var moment = require('moment');

module.exports.login = function(req, res) {
  var body = req.body;

    if (body.email && body.password) {
        User.findOne({ "email": body.email }, function(err, user) {
          if (err) {
              res.status(500).send(err);
          }
          if (user && user.authenticate(body.password)) {
	          var expires = moment().add('days', 7).valueOf();
	          var token = jwt.sign({
	              iss: user._id,
	              exp: expires,                 
	          }, secret);

	          res.json({
	              token: token,
	              expires: expires,
	              user: user.toJSON()
	          });
         } else {
         		res.status(400).json('user not found');
         }
      });
    } else {
    		res.send('');
    }
};

/* User.findOne({ username: username}, function(err, user){
	if (err) {
		//user not found
		return res.send(401);
	}
	
	if(!user) {
		//incorrect username
		return res.send(401);
	}

	if(!user.validPassword(password)) {
		//incorrect password
		return res.send(401);
	}

	//User has authenticated OK
	res.send(200);
});

//Authentication with a JWT token
var expires = moment().add('days', 7).valueOf();
var token = jwt.encode({
	iss: userid,
	exp: expires,
}, app.get('jwtTokenSecret'));

res.json({
	token : token,
	expires: expires,
	user: user.toJSON()
});

};*/
