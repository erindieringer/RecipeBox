var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
exports.init = function(app) {
	app.get("/recipe/:id", yummlyGet)
}

// Calls the Yummly API based on the unique YUMMLY recipeID
// Then renders the showRecipe partial based on the result
// The links for saved recipes and search recipes redirect to this URL
yummlyGet = function(req, res){
	var id = req.params.id
	var baseURL = "http://api.yummly.com/v1/api/recipe/" 
	var credentials = "?_app_id=7d320ce9&_app_key=426ca17f781088f084e9d7993a5d64e6"
	var xhr = new XMLHttpRequest(); 
	  // Quqery URL using parameters
	  var url = baseURL + id + credentials
	  xhr.onreadystatechange=function()  {
	   if (xhr.readyState==4) {
	     if(xhr.status == 200) {
	        var response = JSON.parse(xhr.responseText);
	        var img = response.images[0]["hostedLargeUrl"];
	        res.render('showRecipe', { id: response.id,'name':response.name, 'ingredients':response.ingredientLines, image: img, 
	        	amount: response.numberOfServings, time:response.totalTime, source: response.source.sourceRecipeUrl});

	    } else {
	      console.log="Error code " + xhr.status;
	    }
	   }
	  }
	  xhr.open("GET", url, true); 
	  xhr.send(); 


}