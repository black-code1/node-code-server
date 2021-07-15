// require http module - core module
const http = require('http');

// require file system module
const fs = require('fs');

// require lodash local package - local package create node_modules folder
const _ = require('lodash');

// create a server with the http module
// the callback function runs everytime the request comes in to our server
const server = http.createServer((req, res) => {
  // lodash
  const num = _.random(0, 20);
  console.log(num);

  // run once a function with _.once lodash function
  const greet = _.once(() => {
    console.log('hello');
  });

  greet();
  greet();

  // set header content type
  res.setHeader('content-type', 'text/html');

  let path = './views/';
  switch(req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
      
  }

  // send an html file
  fs.readFile(path, (err, data) => {
    if(err){
      console.log(err);
      res.end();
    } else {
      //res.write(data);
      res.end(data);
    }
  })
});

// invoke the listen method
server.listen(3000, 'localhost', () => {
  console.log('listening for request on port 3000')
})