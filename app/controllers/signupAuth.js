const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const parse = require('mongoose-parse');

const User = mongoose.model('User');
const secret = process.env.SECRET_TOKEN_KEY;

module.exports.signup = (req, res) => {
  const body = req.body;
  if (!(body.name || body.email || body.password)) {
    return res.status(400).json({
      success: false,
      message: 'Incomplete information. name, email and password are required.'
    });
  }
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save((err, user) => {
    if (err) {
      return parse(err);
    }
    const expires = moment().add(7, 'days').valueOf();
    const token = jwt.sign({
      id: user.id,
      exp: expires
    }, secret);
    res.json({
      success: true,
      message: 'Successfully created new user.',
      token,
      expires
    });
  });
};
