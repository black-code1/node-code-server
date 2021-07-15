// require express - returns a function
const express = require('express');

// setup express app - invoke express to create an instance of express app
const app = express();

// register view engine
app.set('view engine', 'ejs')


// listen for request
app.listen(3000);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/blogs/create', (req, res) => {
  res.render('create');
})

// 404 page - use to create middleware & fire middleware functions in express
app.use((req, res) =>{
  res.status(404).render('404');
});