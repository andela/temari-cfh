const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const moment = require('moment');

const User = mongoose.model('User');
const secret = process.env.SECRET_TOKEN_KEY;

module.exports.login = (req, res) => {
  const body = req.body;

  if (!body.email && !body.password) {
    return res.status(400).json({
      success: false,
      message: 'Authentication failed for user from first'
    });
  }

  User.findOne({ email: body.email }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (user && user.authenticate(body.password)) {
      const expires = moment().add('days', 7).valueOf();
      const token = jwt.sign({
        iss: user.id,
        exp: expires,
      }, secret);
      return res.json({
        token,
        user: {
          name: user.name,
          email: user.email
        }
      });
    }
    res.status(400).json({
      success: false,
      message: 'Authentication failed for user'
    });
  });
};
