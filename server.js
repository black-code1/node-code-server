// require http module - core module
const http = require('http');

// create a server with the http module
// the callback function runs everytime the request comes in to our server
const server = http.createServer((req, res) => {
  console.log('request made');
});

// invoke the listen method
server.listen(3000, 'localhost', () => {
  console.log('listening for request on port 3000')
})