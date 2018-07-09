const mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'fifa'
})

dbConnection.connect((err)=>{
  if(err){
    console.error(err.stack)
  }
  console.log("DB connected " + dbConnection.threadId)
})

module.exports = dbConnection;