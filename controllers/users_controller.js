var User = require('../models/users');


// Routes and methods

exports.init = function(app) {
	app.get("/users/all", getAllUser);
	app.get("/users", getOneUser);
	app.post("/users", createUser);
}

createUser = function(req, res){
	var user = new User ({
		username: req.body.username,
		password: req.body.password
	});
	user.save(function(err, user1){
		if(err) 
			return next(err);
  		else 
  			res.json(user1);
	});
}

getAllUser = function(req, res){

	User.find({}, function(err, service) {
		    if (err)
		     	res.send(err);
		  	else 
		    	res.json(service);
	});
	
}

getOneUser = function(req, res){
	User.find({username: req.query.username}, function(err, service) {
		    if (err)
		     	res.send(err);
		  	else 
		    	res.json(service);
	});
	
}

