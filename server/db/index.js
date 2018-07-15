const mysql = require('mysql');
const dbURL = process.env.CLEARDB_DATABASE_URL || {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'fifa'
}

var dbConnection = mysql.createPool(dbURL)

module.exports = dbConnection;