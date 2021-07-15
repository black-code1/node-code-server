// require http module - core module
const http = require('http');

// require file system module
const fs = require('fs');

// create a server with the http module
// the callback function runs everytime the request comes in to our server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content type
  res.setHeader('content-type', 'text/html');

  // send an html file
  fs.readFile('./views/index.html', (err, data) => {
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