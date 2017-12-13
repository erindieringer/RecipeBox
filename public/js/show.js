$(function() { 
	var editMode = false;
	$( document ).ready(function(){
		$(".button-collapse").sideNav();
		$('select').material_select();
	});

	var user = localStorage.user;
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
			var id = recipe._id
			var button = "<button value = '" + recipe.name + "' id ='" + id + "' class='delete-button'>Delete</a>"
			console.log(id);
			$("<div class='row' id='"+ id +"'><div class='col 2'>" + button + "</div><div class='col 10'><a href='../recipe/" + recipe.recipeID + "'><br>" + recipe.name +"</a></div></div>").appendTo("#results");
		}
		$(".delete-button").hide();
	}

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

// onclick of edit button-collapse
// Delete buttons appear
// click on delete and they will dissapear