var Lists = require('../models/lists');
var mongoose = require('mongoose');


// Routes and methods

exports.init = function(app) {
	app.get("/lists/all", getAllLists);
	app.get("/lists/:user", getList);
	app.post("/lists/:user", createList);
	app.put("/lists/:user/:item", updateList);
	app.delete("/lists", deleteList);
}

getAllLists = function(req, res){
	Lists.find({}, function(err, service) {
		    if (err)
		     	res.send(err);
		  	else 
		    	res.json(service);
	});
}

getList = function(req, res){
	Lists.find({user: req.params.user}, function(err, list) {
		    if (err)
		     	res.send(err);
		  	else 
		    	res.json(list);
	});
}
createList = function(req, res){
	var list = new Lists ({
		user: mongoose.Types.ObjectId(req.params.user),
		itemList: [],
	});
	list.save(function(err, list1){
		if(err) 
			return next(err);
  		else 
  			res.json(list1);
	});
	
}
updateList = function(req, res){
	Lists.update({user: req.params.user}, 
		 { $push: { itemList: req.params.item } },
		 {safe: true, upsert: true},
		 function(err, service) {
		    if (err)
		     	res.send(err);
		  	else 
		    	res.json(service);
		});

	
}

deleteList = function(req, res){
	Lists.findOneAndRemove({name: req.body.name}, function(err, user) {
	    if (err)
	      res.send(err);
	    res.json({ message: 'List successfully deleted' });
  }); 
}


