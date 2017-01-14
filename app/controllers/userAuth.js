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

        return res.json({
          token: token,
          expires: expires,
          user: user.toJSON()
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Authentication failed for user'
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Authentication failed for user'
    });
  }
};
