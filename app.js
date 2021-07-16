// require express - returns a function
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const Blog = require('./models/blog');
// setup express app - invoke express to create an instance of express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://legrand:legrand@cluster0.jgecv.mongodb.net/node-tuts?retryWrites=true&w=majority'

// the second argument stops the warning on command line
// listen for request
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch(() => console.log(err));


// register view engine
app.set('view engine', 'ejs')


// middleware & static files
app.use(express.static('public'))

// morgan middleware
app.use(morgan('dev'))

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });

  blog.save()
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err);
      })
});

app.get('/all-blogs', (req, res) => {
  Blog
    .find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

app.get('/single-blog', (req, res) => {
  Blog
    .findById('60f15368635d5e48d11978bb')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err)
    })
})

app.get('/', (req, res) => {
 res.redirect('/blogs')
});

// blog routes
app.get('/blogs', (req, res) => {
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

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'});
});



app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'Create a new Blog'});
})

// 404 page - use to create middleware & fire middleware functions in express
app.use((req, res) =>{
  res.status(404).render('404', {title: '404'});
});