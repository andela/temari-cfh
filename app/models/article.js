// Module dependencies.
const mongoose = require('mongoose');
const config = require('../../config/config');

const Schema = mongoose.Schema;

// Article Schema
const ArticleSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

// Statics
ArticleSchema.statics = {
  load: (id, cb) => {
    this.findOne({
      id
    }).select('-_id').exec(cb);
  }
};

mongoose.model('Article', ArticleSchema);
