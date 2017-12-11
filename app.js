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

var mlab = "mongodb://erindieringer:secret@ds113746.mlab.com:13746/hw15"
var localDB = "mongodb://localhost/yummly"

mongoose.connect(mlab);

var port = process.env.PORT || 8080;
app.listen(port);

app.set('view engine', 'ejs');
