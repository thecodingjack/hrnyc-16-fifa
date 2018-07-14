var dbConnection = require('../db/index.js')

module.exports={
  fifa:{
    renderStandings: ({poolName},cb)=>{
      console.log("FIFA", poolName)
      var queryStr = `SELECT u.*, sum(b.score) as score
      FROM users u
        INNER JOIN userBrackets b ON u.username = b.username
      WHERE b.poolName = "${poolName}"
      GROUP BY u.username`
      dbConnection.query(queryStr,(err,results)=>{
        console.log(results)
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
      var queryStr = `insert into userPools 
        select * from (select "${username}","${poolName}") as tmp
        where not exists (select username,poolName from userPools
        where username= "${username}" AND poolName="${poolName}"
        ) limit 1;`
      dbConnection.query(queryStr,(err,results)=>{
        if(err) cb(err)
        else cb(null,results)
      })
    },
    showPool: ({poolName},cb)=>{
      var queryStr = `select up.username from userPools up where up.poolName = "${poolName}"`
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