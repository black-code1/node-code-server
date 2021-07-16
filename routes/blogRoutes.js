const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

// blog routes
router.get('/create', (req, res) => {
  res.render('create', {title: 'Create a new Blog'});
})

// /blogs/ by app.use('/blogs', blogRoutes)
router.get('/', (req, res) => {
  // find and sort in descending order
  Blog
    .find()
    .sort({ createdAt: -1})
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/', (req, res) => {
  const blog = new Blog(req.body);

  blog
      .save()
      .then((result) => {
        res.redirect('/blogs')
      })
      .catch((err) => {
        console.log(err);
      })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog
    .findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' })
    })
    .catch(err => {
      console.log(err);
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Blog
      .findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' })
      })
      .catch(err => console.log(err))
})


// export the router
module.exports = router;