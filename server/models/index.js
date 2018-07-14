var dbConnection = require('../db/index.js')

module.exports={
  fifa:{
    renderStandings: ({poolName},cb)=>{
      var queryStr = `SELECT u.*, sum(b.score) as score
      FROM users u
        INNER JOIN userBrackets b ON u.username = b.username
      WHERE b.poolName = "${poolName}"
      GROUP BY u.username`
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
    },
    loginUser: (user,cb)=>{
      var queryStr = `select * from users where users.username="${user.username}" AND users.password="${user.password}"`
      var params = [user.username,user.password]
      dbConnection.query(queryStr,params,(err,results)=>{
        console.log("LOGIN ",results)
        console.log("ERR ",err)
        if(err) cb(err)
        else cb(null,results)
      })
    }
  },
  userPools:{
    joinPool: ({username,poolName},cb)=>{
      var queryStr = `insert into userPools (username,poolName)
        select * from (select "${username}","${poolName}") as tmp
        where not exists (select username,poolName from userPools
        where username= "${username}" AND poolName="${poolName}"
        ) limit 1;`
      dbConnection.query(queryStr,(err,results)=>{
        if(err) cb(err)
        else cb(null,results)
      })
    },
    userPoolData: ({poolName,username},cb)=>{
      var queryStr = `select up.username, up.isPlaying from userPools up where up.poolName = "${poolName}" AND up.username = "${username}"`
      dbConnection.query(queryStr,(err,results)=>{
        if(err) cb(err)
        else cb(null,results[0])
      })
    },
    userPoolList: ({username},cb)=>{
      var queryStr = `select up.poolName from userPools up where up.username = "${username}"`
      dbConnection.query(queryStr,(err,results)=>{
        if(err) cb(err)
        else cb(null,results)
      })
    }
  },
  userBrackets:{
    submitBracket: (poolName,username,brackets,cb)=>{
      let allPromise = []
      for(let key in brackets){
        if(key === "isPlaying") continue;
        let bracket = brackets[key]
        let queryStr = `insert into userBrackets values (?,?,default,?,?,?,?,?,?,default)`
        params = [poolName,username,bracket[0],bracket[1],bracket[2],bracket[3],bracket[4],bracket[5]]
        dbConnection.query(queryStr,params,(err,results)=>{
          let newPromise = new Promise(function(resolve,reject){
            if(err) reject(err)
            else resolve(results)
          })
          allPromise.push(newPromise)
        })
      }
      Promise.all(allPromise).then(value=>{
        let queryStr = `update userPools set isPlaying=1 where userPools.poolName="${poolName}" AND userPools.username="${username}"` 
        dbConnection.query(queryStr)
        cb(value);
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