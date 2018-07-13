var dbConnection = require('../db/index.js')

module.exports={
  fifa:{
    renderStandings: (cb)=>{
      var queryStr = `SELECT u.*, sum(b.score) as score
      FROM players u
        INNER JOIN userBrackets b ON u.user_ID = b.user_ID
      GROUP BY u.user_ID`
      dbConnection.query(queryStr,(err,results)=>{
        if(err) cb(err);
        else cb(null,results);
      })
    }
  },
  pools:{
    createPool: (pool,cb)=>{
      var queryStr = 'insert into pools value (default,?)'
      dbConnection.query(queryStr,pool.poolName,(err,results)=>{
        if(err) cb(err);
        else cb(null,results);       
      })
    },
    fetchPools: (cb)=>{
      var queryStr = 'select * from pools'
      dbConnection.query(queryStr,(err,results)=>{
        if(err) cb(err);
        else cb(null,results)
      })
    }
  },
  users:{
    createUser: (user,cb)=>{
      var queryStr = 'insert into users values (default, ? , default , ? )'
      var params = [user.username,user.password]
      dbConnection.query(queryStr,params,(err,results)=>{
        if(err) cb(err)
        else cb(null,results)
      })
    }
  },
  userPools:{
    joinPool: ({username,poolName},cb)=>{
      var queryStr = 'insert into userPools values (?, ?)'
      var params = [username,poolName]
      dbConnection.query(queryStr,params,(err,results)=>{
        if(err) cb(err)
        else cb(null,results)
      })
    },
    showPool: ({poolName},cb)=>{
      var queryStr = `select up.userName from userPools up where up.poolName = "${poolName}"`
      dbConnection.query(queryStr,(err,results)=>{
        if(err) cb(err)
        else cb(null,results)
      })
    }
  },
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