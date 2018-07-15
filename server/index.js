var express = require('express');
var morgan = require('morgan');
var parser = require('body-parser');
var cors = require('cors');
// var router = require('./routes.js');
var controller = require('./controllers')
let port = process.env.PORT||3000

var app = express();


app.set('port', port);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan('dev'));

// Set up our routes
// app.use('/', router);
app.use(express.static(__dirname + '/../client/dist'))

app.get('/fifa',controller.fifa.get)
app.post('/users',controller.users.post)
app.get('/pools',controller.pools.get)
app.post('/pools',controller.pools.post)
app.post('/userPools',controller.userPools.post)
app.get('/userPools',controller.userPools.get)
app.get('/userPoolsList',controller.userPoolsList.get)
app.post('/userBrackets',controller.userBrackets.post)
app.post('/login',controller.login.post)
app.get('/*',(req,res)=>res.redirect('/'))

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

module.exports.app = app;