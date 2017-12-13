$(function() {
	$( document ).ready(function(){
		$(".button-collapse").sideNav();
	});

	// Yummly credentials
	var appID = "7d320ce9";
	var appKey = "426ca17f781088f084e9d7993a5d64e6";
	var baseURL = "https://api.yummly.com/v1/api/recipes?_app_id=7d320ce9&_app_key=426ca17f781088f084e9d7993a5d64e6&q=" ;
	var user = localStorage.user;

	// Runs serach wuery
	$("#search-btn").click(function(e){
		var allergyQuery = "allowedCourse[]=";
		var cuisineQuery = "allowedCuisine[]=";
		var courseQuery = "allowedAllergy[]=";
		var searchQueryUrl = baseURL + encodeURIComponent($("#search-input").val());
		// If allergy selected
		if ($("#allergy").val() !== null) {
			searchQueryUrl += ("&" + allergyQuery + $("#allergy").val());
		}
		//If cuisine selected
		if ($("#cuisine").val() !== null) {
			searchQueryUrl += ("&" + cuisineQuery + $("#cuisine").val());
		}
		// If course selected
		if ($("#course").val() !== null) {
			searchQueryUrl += ("&" + courseQuery + $("#course").val());
		}

		// Executes actual query with url formed from above
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

	// Returns results to DOM
	function handleResults(matches){
		// Clear result div first 
		clearResponses();
		var string = '';
		for(var i=0; i<matches.length; i++){
			var recipe = matches[i];
			var id = recipe.id;
			var name = recipe.recipeName;
			$("<br><a href='../recipe/" + id + "'>" + name +"</a><br>").appendTo("#response-text");
		}
	}

	// Clears results from previous search
	function clearResponses(){
		var node = $("#response-text");
		node.empty();
	}



});