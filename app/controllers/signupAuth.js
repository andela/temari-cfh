var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var dotEnv = require('dotenv');
dotEnv.config();

// get jwt secret
var secret = process.env.JWT_SECRET;

module.exports.signup = function (req, res) {
  var body = req.body;

  if (!(req.body.name || req.body.email || req.body.password)) {
    return res.json({success: false,
      message: 'Incomplete information. name, email and password are required.'
    });
  }


    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    newUser.save(function (err, user){
      if(err){
        return res.send(err);
      }
      
      if (!err) {
        var expires = moment().add(7,'hours').valueOf();
        var token = jwt.sign({
          userId: user._id,
          exp: expires
      }, secret);
      res.json({success: true, message: 'Successfully created new user.',
        token: token,
        expires: expires});
    }

    
    });

  

};
