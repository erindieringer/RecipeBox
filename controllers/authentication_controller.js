// Based on tutorial from http://danialk.github.io/blog/2013/02/20/simple-authentication-in-nodejs/
var path    = require("path");
var User = require('../models/users');
var hash = require('./pass').hash;
exports.init = function(app) {

	function authenticate(name, pass, fn) {
	    if (!module.parent) console.log('authenticating %s:%s', name, pass);

	    User.findOne({
	        username: name
	    },

	    function (err, user) {
	        if (user) {
	            if (err) return fn(new Error('cannot find user'));
	            hash(pass, user.salt, function (err, hash) {
	                if (err) return fn(err);
	                if (hash == user.hash) return fn(null, user);
	                fn(new Error('invalid password'));
	            });
	        } else {
	            return fn(new Error('cannot find user'));
	        }
	    });

	}

	function requiredAuthentication(req, res, next) {
	    if (req.session.user) {
	        next();
	    } else {
	        req.session.error = 'Access denied!';
	        res.redirect('/login');
	    }
	}

	function userExist(req, res, next) {
	    User.count({
	        username: req.body.username
	    }, function (err, count) {
	        if (count === 0) {
	            next();
	        } else {
	            req.session.error = "User Exist"
	            res.redirect("/signup");
	        }
	    });
	}

	app.get("/signup", function (req, res) {
	    if (req.session.user) {
	        res.redirect("/");
	    } else {
	        res.render("signup");
	    }
	});

	app.post("/signup", userExist, function (req, res) {
	    var password = req.body.password;
	    var username = req.body.username;

	    hash(password, function (err, salt, hash) {
	        if (err) throw err;
	        var user = new User({
	            username: username,
	            salt: salt,
	            hash: hash,
	        }).save(function (err, newUser) {
	            if (err) throw err;
	            authenticate(newUser.username, password, function(err, user){
	                if(user){
	                    req.session.regenerate(function(){
	                        req.session.user = user;
	                        req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
	                        // res.redirect('/home');
	                        res.send(user);
	                    });
	                }
	            });
	        });
	    });
	});

	app.get("/login", function (req, res) {
	    res.sendFile(path.join(__dirname+'/../public/login.html'));
	});

	app.post("/login", function (req, res) {
	    authenticate(req.body.username, req.body.password, function (err, user) {
	        if (user) {
	            req.session.regenerate(function () {

	                req.session.user = user;
	                req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/logout">logout</a>. ' + ' You may now access <a href="/restricted">/restricted</a>.';
	                // res.redirect('/home');
	                res.send(user);
	            });
	        } else if (err) {
	        	throw err;
	            req.session.error = 'Authentication failed, please check your ' + ' username and password.';
	            res.redirect('/login');
	        }
	    });
	});

	app.get('/logout', function (req, res) {
	    req.session.destroy(function () {
	        res.redirect('/login');
	    });
	});

	app.get('/home', requiredAuthentication, function (req, res) {
	    res.sendFile(path.join(__dirname+'/../public/search.html'));
	});
}