// Module dependencies.
const mongoose = require('mongoose');
const async = require('async');
const _ = require('underscore');

// Redirect users to /#!/app (forcing Angular to reload the page)
exports.play = (req, res) => {
  if (Object.keys(req.query)[0] === 'custom') {
    res.redirect('/#!/app?custom');
  } else {
    res.redirect('/#!/app');
  }
};

/**
 * Redirect users to the tour of the app
 * @param{Stream} req - readable stream from the client
 * @param{Stream} res - writable stream
 * @return{undefined}
 */
exports.gameTour = (req, res) => {
  if (Object.keys(req.query)[0] === 'custom') {
    res.redirect('/#!/gametour?custom');
  } else {
    res.redirect('/#!/gametour');
  }
};


exports.render = (req, res) => {
  res.render('index', {
    user: req.user ? JSON.stringify(req.user) : 'null'
  });
};
