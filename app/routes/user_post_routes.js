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


// INDEX
// GET/ posts


// SHOW
// GET/ posts/id


// UPDATE
// PATCH/ posts/id


// DESTROY
// DELETE /posts/id



// module exports the router
