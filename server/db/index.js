const mysql = require('mysql');
const dbURL = process.env.CLEARDB_DATABASE_URL || {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'fifa'
}

function handleDisconnect(){
  let dbConnection = mysql.createConnection(dbURL)

  dbConnection.connect((err)=>{
    if(err){
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();                         
      } else {                                      
        throw err;                               
      }
    }
    console.log("DB connected " + dbConnection.threadId)
  })

  return dbConnection;
}

let connection = handleDisconnect();

module.exports = connection;