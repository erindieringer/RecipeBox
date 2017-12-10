var Recipe = require('../models/saved');
var mongoose = require('mongoose');


// Routes and methods

exports.init = function(app) {
	app.get("/recipes/all", getAllRecipe);
	app.get("/recipes/:user", getRecipeByUser);
	app.post("/recipes/:user/:name/:id", createRecipe);
	app.delete("/recipes", deleteRecipe);
}

getAllRecipe = function(req, res){
	Recipe.find({}, function(err, service) {
		    if (err)
		     	res.send(err);
		  	else 
		    	res.json(service);
	});
}
getRecipeByUser = function(req, res){
	Recipe.find({user: mongoose.Types.ObjectId(req.params.user)}, function(err, user) {
		if (err)
		 	res.send(err);
		else 
			res.json(user);
	});
}
createRecipe = function(req, res){
	var recipe = new Recipe ({
		name: req.params.name,
		recipeID: req.params.id,
		savedDate: Date.now(),
		user: mongoose.Types.ObjectId(req.params.user),
	});
	recipe.save(function(err, recipe1){
		if(err) 
			return next(err);
  		else 
  			res.json(recipe1);
	});
}
deleteRecipe = function(req, res){
	Recipe.findOneAndRemove({recipeID: req.body.id}, function(err, user) {
	    if (err)
	      res.send(err);
	    res.json({ message: 'List successfully deleted' });
  }); 
}