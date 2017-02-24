const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const parse = require('mongoose-parse');
const avatar = require('./avatars').all();

const User = mongoose.model('User');
const secret = process.env.SECRET_TOKEN_KEY;

exports.signup = (req, res) => {
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
    password: req.body.password,
  });
  newUser.avatar = avatars[user.avatar];
  newUser.provider = 'local';
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      throw err;
    }
    if (existingUser) {
      res.send({ success: false, message: 'Already a user' });
    }
  });
  newUser.save((err) => {
    if (err) {
      return parse(err);
    }
    const expires = moment().add(7, 'hours').valueOf();
    const token = jwt.sign({
      exp: expires
    }, secret);
    res.json({
      success: true,
      message: 'Successfully created new user.',
      token,
      email: req.body.email,
      name: req.body.name,
      expires
    });
  });
};


