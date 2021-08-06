// need to require express, the model, custom errors, passport
const express = require('express')
const passport = require('passport')
const Post = require('./../models/post')
const customErrors = require('./../../lib/custom_errors')
// declare require token, router, and custom error handlers from within that file
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// CREATE
// POST/ posts
router.post('/posts', requireToken, (req, res, next) => {
  const postData = req.body.post
  // set the owner of the post as the current user
  postData.owner = req.user.id
  Post.create(postData)
  // if successful send status code 201 and send the json object
    .then(post => {
      res.status(201).json({ post })
    })
    .catch(next)
})

// INDEX
// GET/ posts
router.get('/posts', requireToken, (req, res, next) => {
  Post.find()
    .then(posts => {
      return posts.map(post => post.toObject())
    })
    .then(posts => res.status(200).json({ posts }))
    .catch(next)
})

// SHOW
// GET/ posts/id

// UPDATE
// PATCH/ posts/id

// DESTROY
// DELETE /posts/id

// module exports the router
module.exports = router
