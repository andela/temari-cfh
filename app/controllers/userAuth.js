const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const moment = require('moment');

const User = mongoose.model('User');
const secret = process.env.SECRET_TOKEN_KEY;

module.exports.login = (req, res) => {
  const body = req.body;
  User.findOne({ _id: req.query.id }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    const expires = moment().add('days', 7).valueOf();
    const token = jwt.sign({
      iss: user.email,
      exp: expires,
    }, secret);

    return res.json({
      token,
      user: {
        email: user.email
      }
    });
  });
};
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const moment = require('moment');

const User = mongoose.model('User');
const secret = process.env.SECRET_TOKEN_KEY;

module.exports.login = (req, res) => {
  const body = req.body;
  User.findOne({ _id: req.query.id }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    const expires = moment().add('days', 7).valueOf();
    const token = jwt.sign({
      iss: user.email,
      exp: expires,
    }, secret);

    return res.json({
      token,
      user: {
        email: user.email
      }
    });
  });
};
