// require express - returns a function
const express = require('express');

// setup express app - invoke express to create an instance of express app
const app = express();

// register view engine
app.set('view engine', 'ejs')


// listen for request
app.listen(3000);

// middleware
app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
})

app.use((req, res, next) => {
  console.log('in the next middleware');
 
  next();
})

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