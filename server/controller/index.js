var fs = require('fs');
var MyApp = require('../db/fs_index.js')

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


var handleRequest = function (req, res) {
  let {method,url} = req
  let body = ''
  var resContainer = {
    defaultCorsHeaders,
    method,
    url,
    results: []
  }

  //ROUTING
  if (url === '/todo') {
    if (method === 'GET') {
      let headers = Object.assign({}, defaultCorsHeaders, {
        'Content-Type': 'text/plain'
      })
      MyApp.readAll((err, messages) => {
        if (err) {
          res.writeHeader(500, headers)
          res.end(err)
        } else {
          res.writeHeader(200, headers)
          res.end(JSON.stringify(messages))
        }
      })
    } else if (method === 'POST') {
      let headers = Object.assign({}, defaultCorsHeaders, {
        'Content-Type': 'application/json'
      })
      req.on('data', (chunk) => body += chunk).on('end', () => {
        console.log("BODY",body)
        MyApp.create(JSON.parse(body).text, (err, postedData) => {
          if (err) {
            res.writeHeader(500, headers)
            res.end(err)
          } else {
            res.writeHeader(201, headers)
            res.end(JSON.stringify(postedData))
          }
        })
      })
    } else if (method === 'OPTIONS') {
      res.writeHeader(200, defaultCorsHeaders)
      res.end()
    } else {
      res.writeHeader(405, defaultCorsHeaders)
      res.end("Method not supported")
    }
  } else {
    res.writeHeader(404, defaultCorsHeaders)
    res.end("Resource not found")
  }
}

module.exports = handleRequest
