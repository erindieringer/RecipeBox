$(function() { 
	var editMode = false;
	var user = localStorage.user;

	$( document ).ready(function(){
		$(".button-collapse").sideNav();
		$('select').material_select();
	});

	// Get saved recipe from user in localStorage
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

	// Add these results from above to DOM
	function handleResults(matches){
		var string = '';
		for(var i=0; i<matches.length; i++){
			var recipe = matches[i];
			var id = recipe._id
			var button = "<button value = '" + recipe.name + "' id ='" + id + "' class='delete-button'>Delete</a>"
			console.log(id);
			$("<div class='row' id='"+ id +"'><div class='col 2'>" + button + "</div><div class='col 10'><a href='../recipe/" + recipe.recipeID + "'><br>" + recipe.name +"</a></div></div>").appendTo("#results");
		}
		$(".delete-button").hide();
	}

	// If edit is clicked, show delete buttons
	$("#edit").click(function(){
		if (editMode === false){
			editMode = true;
			$("#edit").html("Finish Editing");
			buttonShow();
		}else {
			editMode = false;
			$("#edit").html("Edit List");
			buttonShow();
		}
	});

	// Shows the delete buttons
	function buttonShow(){
		if (editMode === true){
			$(".delete-button").show();
			$(".delete-button").click(function(){
				var name = this.value;
				var retVal = confirm("Are you sure you want to delete " +name+ " ?");
               	if( retVal == true ){
                  	deleteRecipe(this.id)
               	}
			});
		} else {
			$(".delete-button").hide();
		}
	}

	// If confirmed delete recipe from server and DOM
	function deleteRecipe(id){
			$.ajax({
		        type: "DELETE",
		        url: "/recipes/" + id,
		        data: {},
		        success: function(result) {
		        	console.log(result);
		        	document.getElementById(id).remove();

		        },
		        error: function(result) {
		            console.log(result);
		        }
		});
	}

});

