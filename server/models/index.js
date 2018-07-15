var dbConnection = require('../db/index.js')

const matchStandings=[
  [1,1,2,0,2,2],
  [2,3,4,1,2,4],
  [3,5,6,2,2,6],
  [4,7,8,0,2,8],
  [5,2,4,1,0,2],
  [6,6,8,2,1,6],
  [7,2,6,4,2,2]
]

function calculateScore(brackets){
  brackets = Object.keys(brackets).map(k=>brackets[k]);
  console.log(brackets)
  matchStandings.forEach((match,idx)=>{
    let currentBracket = brackets[idx]
    let score = 0;
    if(match[1] == currentBracket[1] && match[3] == currentBracket[3]) score += 0.5
    if(match[2] == currentBracket[2] && match[4] == currentBracket[4]) score += 0.5
    if(match[5] == brackets[idx][5]){
      if(match[0]<=4) score += 1
      else if (match[0]<=6) score += 2
      else score +=4
    }
    currentBracket.push(score)
  })
  return brackets
}

module.exports={
  fifa:{
    renderStandings: ({poolName},cb)=>{
      dbConnection.getConnection(((err,connection)=>{
        if(err) return console.log(err)
        var queryStr = `SELECT u.*, sum(b.score) as score
        FROM users u
          INNER JOIN userBrackets b ON u.username = b.username
        WHERE b.poolName = "${poolName}"
        GROUP BY u.username`
        connection.query(queryStr,(err,results)=>{
          connection.release();
          if(err) cb(err);
          else cb(null,results);
        })
      }))
    }
  },
  pools:{
    createPool: (pool,cb)=>{
      dbConnection.getConnection(((err,connection)=>{
        if(err) return console.log(err)
        var queryStr = 'insert into pools value (default,?)'
        connection.query(queryStr,pool.poolName,(err,results)=>{
          connection.release();
          if(err) cb(err);
          else cb(null,results);       
        })
      }))
    },
    fetchPools: (cb)=>{
      dbConnection.getConnection(((err,connection)=>{
        if(err) return console.log(err)
        var queryStr = 'select * from pools'
        connection.query(queryStr,(err,results)=>{
          connection.release();
          if(err) cb(err);
          else cb(null,results)
        })
      }))
    }
  },
  users:{
    createUser: (user,cb)=>{
      dbConnection.getConnection(((err,connection)=>{
        if(err) return console.log(err)
        var queryStr = 'insert into users values (default, ? , default , ? )'
        var params = [user.username,user.password]
        connection.query(queryStr,params,(err,results)=>{
          connection.release();
          if(err) cb(err)
          else cb(null,results)
        })
      }))
    },
    loginUser: (user,cb)=>{
      dbConnection.getConnection(((err,connection)=>{
        if(err) return console.log(err)
        var queryStr = `select * from users where users.username="${user.username}" AND users.password="${user.password}"`
        var params = [user.username,user.password]
        connection.query(queryStr,params,(err,results)=>{
          connection.release();
          console.log("LOGIN ",results)
          console.log("ERR ",err)
          if(err) cb(err)
          else cb(null,results)
        })
      }))
    }
  },
  userPools:{
    joinPool: ({username,poolName},cb)=>{
      dbConnection.getConnection(((err,connection)=>{
        if(err) return console.log(err)
        var queryStr = `insert into userPools (username,poolName)
          select * from (select "${username}","${poolName}") as tmp
          where not exists (select username,poolName from userPools
          where username= "${username}" AND poolName="${poolName}"
          ) limit 1;`
        connection.query(queryStr,(err,results)=>{
          connection.release();
          if(err) cb(err)
          else cb(null,results)
        })
      }))
    },
    userPoolData: ({poolName,username},cb)=>{
      dbConnection.getConnection(((err,connection)=>{
        if(err) return console.log(err)
        var queryStr = `select up.username, up.isPlaying from userPools up where up.poolName = "${poolName}" AND up.username = "${username}"`
        connection.query(queryStr,(err,results)=>{
          connection.release();
          if(err) cb(err)
          else cb(null,results[0])
        })
      }))
    },
    userPoolList: ({username},cb)=>{
      dbConnection.getConnection(((err,connection)=>{
        if(err) return console.log(err)
        var queryStr = `select up.poolName from userPools up where up.username = "${username}"`
        connection.query(queryStr,(err,results)=>{
          connection.release();
          if(err) cb(err)
          else cb(null,results)
        })
      }))
    }
  },
  userBrackets:{
    submitBracket: (poolName,username,brackets,cb)=>{
      dbConnection.getConnection(((err,connection)=>{
        if(err) return console.log(err)
        let allPromise = []
        brackets = calculateScore(brackets);
        for(let key in brackets){
          let bracket = brackets[key]
          let queryStr = `insert into userBrackets values (?,?,default,?,?,?,?,?,?,?)`
          params = [poolName,username,bracket[0],bracket[1],bracket[2],bracket[3],bracket[4],bracket[5],bracket[6]]
          connection.query(queryStr,params,(err,results)=>{
            let newPromise = new Promise(function(resolve,reject){
              if(err) reject(err)
              else resolve(results)
            })
            allPromise.push(newPromise)
          })
        }
        Promise.all(allPromise).then(value=>{
          let queryStr = `update userPools set isPlaying=1 where userPools.poolName="${poolName}" AND userPools.username="${username}"` 
          connection.query(queryStr,()=>connection.release())
          cb(value);
        })
      }))
    }
  }
}