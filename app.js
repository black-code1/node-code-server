// require express - returns a function
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const blogRoutes = require('./routes/blogRoutes');
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
// middleware that parses urlencoded data into an object we can use on the request object
app.use(express.urlencoded({ extended: true }))

// morgan middleware
app.use(morgan('dev'))

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
 res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', {title: 'About'});
});

// blog routes - use the route on our app - scope to /blogs
app.use('/blogs', blogRoutes)


// 404 page - use to create middleware & fire middleware functions in express
app.use((req, res) =>{
  res.status(404).render('404', {title: '404'});
});