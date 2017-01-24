const mongoose = require('mongoose');

const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const secret = process.env.SECRET_TOKEN_KEY;

exports.signup = (req, res) => {
  const body = req.body;

  if (!(body.name || body.email || body.password)) {
    return res.json({ success: false,
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
      res.send(err);
    } else {
      const expires = moment().add(7, 'days').valueOf();
      const token = jwt.sign({ userId: user._id, exp: expires }, secret);
      res.json({ success: true, message: 'Successfully created new user.', tok: token, exp: expires });
    }
  });
};
