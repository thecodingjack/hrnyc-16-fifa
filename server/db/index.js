const mysql = require('mysql');
const dbURL = process.env.CLEARDB_DATABASE_URL || {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'fifa'
}

var dbConnection = mysql.createConnection(dbURL)

dbConnection.connect((err)=>{
  if(err){
    console.error(err.stack)
  }
  console.log("DB connected " + dbConnection.threadId)
})

module.exports = dbConnection;