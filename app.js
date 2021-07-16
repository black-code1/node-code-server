// require express - returns a function
const express = require('express');
const morgan = require('morgan');
// setup express app - invoke express to create an instance of express app
const app = express();

// register view engine
app.set('view engine', 'ejs')


// listen for request
app.listen(3000);

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