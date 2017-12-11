$(function() {
	$( document ).ready(function(){
		$(".button-collapse").sideNav();
		$('select').material_select();
	});
	var user = localStorage.user;
	console.log(user)
	$.ajax({
		        type: "GET",
		        url: "/recipes/" + user,
		        data: {},
		        success: function(result) {
		        	console.log("result" + result);
		            handleResults(result);

		        },
		        error: function(result) {
		            $("#response-text").text("Could not get");
		        }
		});

	function handleResults(matches){
		var string = '';
		for(var i=0; i<matches.length; i++){
			var recipe = matches[i];
			console.log(recipe);
			$("<div class='col s12' id='result'><a href='../recipe/" + recipe.recipeID + "'><br>" + recipe.name +"</a></div>").appendTo("#results");
		}
	}
});
