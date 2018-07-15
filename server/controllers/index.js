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
