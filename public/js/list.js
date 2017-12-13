$(function() {
	$( document ).ready(function(){
		$(".button-collapse").sideNav();
	});
	// Current user from local storage
	var user = localStorage.user;

	// Retreive the grocery list for current user
	$.ajax({
		        type: "GET",
		        url: "/lists/" + user,
		        data: {},
		        success: function(result) {
		        	console.log("result" + result);
		            handleResults(result);

		        },
		        error: function(result) {
		            $("#response-text").text("Could not get");
		        }
		});

	// Show results on DOM
	function handleResults(result){
		var items = result[0].itemList;
		for(var i=0; i<items.length; i++){
			var item = items[i];
			$("<p id='pItem'>" + item +  "</p><br>").appendTo("#response-text");
		}
	}

	// Clear the client side view of lists
	function clearList(){
		$("#response-text").empty();
	}

	// Set list to empty in server
	$("#clear").click(function(e){
		var retVal = confirm("Are you sure you want to delete the list");
        if( retVal == true ){        
			$.ajax({
			    type: "PUT",
			    url: "/lists/" + user,
			    data: {},
			    success: function(result) {
			    	clearList();
			    },
			    error: function(result) {
			        $("#response-text").text("Could not get");
			    }
			});
		}
	});


});