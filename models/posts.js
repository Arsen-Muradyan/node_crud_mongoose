const mongoose = require('mongoose');
//Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
})
//Post Model
const Post = mongoose.model('Post', postSchema)

//Export Model

module.exports = Post;