$(function() {
	$( document ).ready(function(){
		$(".button-collapse").sideNav();
	});

    // Adds ingediernt to current logged in users list
	$(".btn-floating").click(function(e){
		// Gets ingredident text for that button line
		var ingredient = $("#p"+this.id ).text();
        ingredient = ingredient.replace('/', '|'); // must replace or else params will be messed up
		addToGrocery(ingredient);
	});

    // Adds item to users list on server side
	function addToGrocery(ingredient){
        var user = localStorage.user;
		console.log(ingredient);
    	$.ajax({
    		        type: "PUT",
    		        url: `/lists/${user}/${ingredient}`,
    		        data: {},
    		        success: function(result) {
    		        	alert(`${ingredient} added to grocery list`);
    		            console.log(result);

    		        },
    		        error: function(result) {
    		            alert("could not add");
    		            console.log(result);
    		        }
    		});
	}
});
