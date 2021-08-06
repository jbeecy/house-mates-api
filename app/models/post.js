const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  owner: {
    // owner will hold an id from another document. the collection we will be
    // referencing when locating the document is the User model.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
