const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
//Routes
router.get('', (req, res) => {
  Post.find().then(posts =>  {
    res.render('index', {
      posts
    })
  })
})

router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/new', (req, res) => {
  const title = req.body.title
  const body = req.body.body
  if (title && body) {
    var post = new Post({title, body});
    post.save().then(res.redirect('/posts'))
  }
})
router.get('/:id/edit', (req, res) => {
  Post.findById(req.params.id).then(post => {
    res.render('edit', {
      post
    })
  })
}) 
router.post('/:id/update', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {title:req.body.title, body: req.body.body}).then(post => {
    res.redirect(`/posts/${post.id}`)
  })
}) 
router.get('/:id', (req, res) => {
  const id = req.params.id
  Post.findById(id).then(post => {
    if (post) {
      res.render('show', {
        post
      })
    }
    else {
      res.redirect('/posts')
    }
  })
}) 
router.post('/:id', (req, res) => {
  const id = req.params.id
  Post.findByIdAndRemove(id).then(res.redirect('/posts'));
})

//Export Router
module.exports = router