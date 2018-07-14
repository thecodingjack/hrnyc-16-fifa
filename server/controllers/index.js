var MyApp = require('../models');

module.exports ={
  fifa: {
    get: function(req,res){
      MyApp.fifa.renderStandings(req.query,(err,results)=>{
        if (err) {
          res.status(500).end(err)
        } else {
          res.send(results)
        }
      })
    }
  },
  pools:{
    get: function(req,res){
      MyApp.pools.fetchPools((err,results)=>{
        if (err) res.send(err)
        else res.send(results)
      })
    },
    post: function(req,res){
      let body = ''
      req.on('data',(chunk)=>body+=chunk).on('end',()=>{
        MyApp.pools.createPool(JSON.parse(body),(err,results)=>{
          if (err) res.send(err)
          else res.send(results)
        })
      })
    }
  },
  users:{
    post: function(req,res){
      let body=''
      req.on('data',(chunk)=>body+=chunk).on('end',()=>{
        MyApp.users.createUser(JSON.parse(body),(err,results)=>{
          if (err) res.send(err)
          else res.send(results)
        })
      })
    }
  },
  userPools:{
    post: function(req,res){
      let body=''
      req.on('data',(chunk)=>body+=chunk).on('end',()=>{
        MyApp.userPools.joinPool(JSON.parse(body),(err,results)=>{
          if (err) res.send(err)
          else res.send(results)
        })
      })
    },
    get: function(req,res){
      MyApp.userPools.userPoolData((req.query),(err,results)=>{
        if (err) res.send(err)
        else res.send(results)
      })
    }
  },
  userPoolsList:{
    get: function(req,res){
      MyApp.userPools.userPoolList((req.query),(err,results)=>{
        if (err) res.send(err)
        else res.send(results)
      })
    } 
  },
  userBrackets:{
    post: function(req,res){
      let body=''
      req.on('data',(chunk)=>body+=chunk).on('end',()=>{
        let {poolName,username,bracket} = JSON.parse(body)
        MyApp.userBrackets.submitBracket(poolName,username,bracket,(err,results)=>{
          if (err) res.send(err)
          else res.send(results)
        })
      })
    }
  },
  login:{
    post: function(req,res){
      let body=''
      req.on('data',(chunk)=>body+=chunk).on('end',()=>{
        MyApp.users.loginUser(JSON.parse(body),(err,results)=>{
          if (err) res.send(err)
          else res.send(results)
        })
      })
    }
  }
}


// var defaultCorsHeaders = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10 // Seconds.
// };


// module.exports = function (req, res) {
//   let {method,url} = req
//   let body = ''
  //ROUTING
  // if (url === '/fifa') {
  //   if (method === 'GET') {
  //     let headers = Object.assign({}, defaultCorsHeaders, {
  //       'Content-Type': 'text/plain'
  //     })
  //     MyApp.fifa.renderStandings((err, messages) => {
  //       if (err) {
  //         res.writeHeader(500, headers)
  //         res.end(err)
  //       } else {
  //         res.writeHeader(200, headers)
  //         res.end(JSON.stringify(messages))
  //       }
  //     })
  //   } else if (method === 'POST') {
  //     // let headers = Object.assign({}, defaultCorsHeaders, {
  //     //   'Content-Type': 'application/json'
  //     // })
  //     // req.on('data', (chunk) => body += chunk).on('end', () => {
  //     //   MyApp.todos.create(JSON.parse(body).text, (err, postedData) => {
  //     //     if (err) {
  //     //       res.writeHeader(500, headers)
  //     //       res.end(err)
  //     //     } else {
  //     //       res.writeHeader(201, headers)
  //     //       res.end(JSON.stringify(postedData))
  //     //     }
  //     //   })
  //     // })
  //   } else if (method === 'OPTIONS') {
  //     res.writeHeader(200, defaultCorsHeaders)
  //     res.end()
  //   } else {
  //     res.writeHeader(405, defaultCorsHeaders)
  //     res.end("Method not supported")
  //   }
  // } else {
  //   res.writeHeader(404, defaultCorsHeaders)
  //   res.end("Resource not found")
  // }
// }
