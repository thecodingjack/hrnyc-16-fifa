var http = require('http')
var handleRequest = require('./controller/index.js')

var server = http.createServer(handleRequest)
server.listen(3000,'127.0.0.1',()=>{
  console.log('Listening at port 3000');
})