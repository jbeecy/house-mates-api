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
router.get('/posts/:id', requireToken, (req, res, next) => {
  // below statement will be based on the id in the route of the request
  Post.findById(req.params.id)
    // need to handle 404 which is no content
    .then(handle404)
    .then(post => res.status(200).json({ post: post.toObject() }))
    .catch(next)
})

// UPDATE
// PATCH/ posts/id
router.patch('/posts/:id', requireToken, (req, res, next) => {
  delete req.body.post.owner
  Post.findById(req.params.id)
    .then(handle404)
    .then(post => {
      requireOwnership(req, post)
      return post.updateOne(req.body.post)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /posts/id
router.delete('/posts/:id', requireToken, (req, res, next) => {
  Post.findById(req.params.id)
    .then(handle404)
    .then(post => {
      requireOwnership(req, post)
      post.deleteOne()
        .then(() => res.sendStatus(204))
        .catch(next)
    })
})

// module exports the router
module.exports = router
