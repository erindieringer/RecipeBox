$(function() {
	var user = localStorage.user;
	$( document ).ready(function(){
			$(".button-collapse").sideNav();
	});
	$(".btn-floating").click(function(e){
		// Gets ingredietn text for that button line
		var ingredient = $("#p"+this.id ).text();
		addToGrocery(ingredient);
	});
	function addToGrocery(ingredient){
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
