$(function() {
	$( document ).ready(function(){
		$(".button-collapse").sideNav();
	});
	var user = localStorage.user;
	console.log(user)
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

	function handleResults(result){
		var items = result[0].itemList;
		for(var i=0; i<items.length; i++){
			var item = items[i];
			var button = "<input type='checkbox' id='test5' />"
			$("<p id='pItem'>" + item +  "</p><br>").appendTo("#response-text");
		}
	}

	function clearList(){
		$("#response-text").empty();
	}

	$("#clear").click(function(e){
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
	});

	$(".btn-floating btn-mini waves-effect waves-light red").click(function(e){
		console.log(this.id);
	});


});