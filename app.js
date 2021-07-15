// require express - returns a function
const express = require('express');

// setup express app - invoke express to create an instance of express app
const app = express();

// listen for request
app.listen(3000);

app.get('/', (req, res) => {
  //res.send('<p>home page</p>');
  res.sendFile('./views/index.html', { root: __dirname});
});

app.get('/about', (req, res) => {
  //res.send('<p>about page</p>');
  res.sendFile('./views/about.html', { root: __dirname});
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page - use to create middleware & fire middleware functions in express
app.use('', (req, res) =>{
  res.status(404).sendFile('./views/404.html', { root: __dirname})
})