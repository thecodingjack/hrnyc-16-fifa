var dbConnection = require('../db/index.js')

module.exports={
  todos: {
    create: (message,cb)=>{
      var queryStr = 'insert into todos (message) value (?)'
      dbConnection.query(queryStr,message,(err,results)=>{
        if(err){
          cb(err)
        }else{
          cb(null, results)
        }
      })
    },
    readAll: (cb)=>{
      var queryStr = 'select * from todos'
      dbConnection.query(queryStr,(err,results)=>{
        if(err){
          cb(err)
        }else{
          cb(null,results)
        }
      })
    },
  }
}