$(function() {
	$( document ).ready(function(){
		$(".button-collapse").sideNav();
	});
	var appID = "7d320ce9";
	var appKey = "426ca17f781088f084e9d7993a5d64e6";
	var baseURL = "http://api.yummly.com/v1/api/recipes?_app_id=7d320ce9&_app_key=426ca17f781088f084e9d7993a5d64e6&q=" ;
	var user = localStorage.user;
	$("#search-btn").click(function(e){
		var allergyQuery = "allowedCourse[]=";
		var cuisineQuery = "allowedCuisine[]=";
		var courseQuery = "allowedAllergy[]=";
		var searchQueryUrl = baseURL + encodeURIComponent($("#search-input").val());
		if ($("#allergy").val() !== null) {
			searchQueryUrl += ("&" + allergyQuery + $("#allergy").val());
		}
		if ($("#cuisine").val() !== null) {
			searchQueryUrl += ("&" + cuisineQuery + $("#cuisine").val());
		}
		if ($("#course").val() !== null) {
			searchQueryUrl += ("&" + courseQuery + $("#course").val());
		}

		console.log(searchQueryUrl);
		$.ajax({
		        type: "GET",
		        url: searchQueryUrl,
		        data: {},
		        success: function(result) {
		            handleResults(result["matches"]);

		        },
		        error: function(result) {
		            $("#response-text").text("Could not get");
		        }
		});
	});

	function handleResults(matches){
		var string = '';
		for(var i=0; i<matches.length; i++){
			var recipe = matches[i];
			var id = recipe.id;
			var name = recipe.recipeName;
			$("<div class='col s12' id='result'><a href='../recipe/" + id + "'>" + name +"</a></div>").appendTo("#results");
		}
	}
	$("#result").click(function(e){
		console.log(this.id);
	});


});