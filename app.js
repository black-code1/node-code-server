// require express - returns a function
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
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

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Grealish finds templates', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, vel.'},
    {title: 'Diaz finds templates', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, vel.'},
    {title: 'Ferran finds templates', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, vel.'},
  ]
  res.render('index', {title: 'Home', blogs});
});

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