const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema describe the structure of our document
const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true});

// store the model
// create a model base on the schema
const Blog = mongoose.model('Blog', blogSchema)

// export the model
module.exports = Blog;