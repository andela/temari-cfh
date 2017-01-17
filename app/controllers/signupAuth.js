var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');
var moment = require('moment');


// get jwt secret
var secret = process.env.JWT_SECRET || 'super duper secret';

module.exports.signup = function (req, res) {
  var body = req.body;

  if (!(req.body.name || req.body.email && req.body.password)) {
    return res.json({success: false,
      message: 'Incomplete parameters. name, email and password are required.'
    });
  }else{
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    newUser.save(function (err, user){
      if(err){res.send(err);
        //return res.status(401).json({success: false, 
          //message: 'User already exists.'});
      }else{
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
  }

  /*User.findOne({
    email: req.body.email,
    password: req.body.password
  }, function (err, existingUser) {
    if (existingUser) {
      return res.send(409, {
        message: 'User already exist.'
      });
    } 

    var user = new User(req.body);
    
        var expires = moment().add(7,'hours').valueOf();
        var token = jwt.sign({
          userId: user._id,
          exp: expires,
        }, secret);
        res.send({
          //
          token: token,
          expires:expires
        });
      
      });*/

};
