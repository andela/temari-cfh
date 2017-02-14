/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  config = require('../../config/config'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
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

/**
 * Statics
 */
ArticleSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      id: id
    }).select('-_id').exec(cb);
  }
};

mongoose.model('Article', ArticleSchema);