 var express = require('express'),
   env = process.env.NODE_ENV || 'development';

var forceSsl = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
};

var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require("body-parser");
var path    = require("path");
var cookieParser = require('cookie-parser')
var session = require('express-session')



if (env === 'production') {
        app.use(forceSsl);
    }

//Middlewares and configurations 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser('secret'));
app.use(session());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
    var err = req.session.error,
        msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

// Call controllers
require('./controllers/users_controller.js').init(app);
require('./controllers/lists_controller.js').init(app);
require('./controllers/saved_controller.js').init(app);
require('./controllers/yummly_controller.js').init(app);
require('./controllers/authentication_controller.js').init(app);




app.get('/home',function(req,res){
  res.sendFile(path.join(__dirname+'/public/search.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/my-recipes',function(req,res){
  res.sendFile(path.join(__dirname+'/public/recipes.html'));
});

app.get('/my-grocery-list',function(req,res){
  res.sendFile(path.join(__dirname+'/public/list.html'));
});

var mlab = process.env.MONGODB_URI || "mongodb://erindieringer:secret@ds113746.mlab.com:13746/hw15"

mongoose.connect(mlab, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

// var port = process.env.PORT || 8080;
// app.listen(port);

var httpServer = require('http').createServer(app);

/*
 * Boilerplate for setting up socket.io alongside Express.
 * If socket.io is not needed, comment out the 2 socket.io lines
 */
//var sio =require('socket.io')(httpServer);

// The server socket.io code is in the socketio directory.
//require('./socketio/serverSocket.js').init(sio);

/*
 * OpenShift will provide environment variables indicating the IP 
 * address and PORT to use.  If those variables are not available
 * (e.g. when you are testing the application on your laptop) then
 * use default values of localhost (127.0.0.1) and 50000 (arbitrary).
 */
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

httpServer.listen(port, ipaddress, function() {console.log('Listening on '+ipaddress+':'+port);});


