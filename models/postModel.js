const mongoose = require('mongoose');
const User = require('./userModel');

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  likes: [mongoose.Schema.Types.ObjectId],
  created_at: {
    type: Date,
    default: Date.now()
  }
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  tags: [],
  created_at: {
    type: Date,
    default: Date.now()
  },
  likes: [mongoose.Schema.Types.ObjectId],
  comments: [commentSchema]
});

module.exports = mongoose.model('Post', postSchema);