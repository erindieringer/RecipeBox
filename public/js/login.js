$(function() {
	$("#signup").click(function(e){
		var username = $("#username").val();
		var password = $("#password").val();
		$.post('http://localhost:3000/signup', { username: username, password:password }, 
		    function(returnedData){
		        localStorage.user = returnedData._id
		        createList(returnedData._id); // Create empty grocery list for newly signed up user
		        window.location.replace("/home");

		}).fail(function(){
		       alert("Try again, did not work")
		});
	});

	$("#login").click(function(e){
		var username = $("#username").val();
		var password = $("#password").val();
		$.post('http://localhost:3000/login', { username: username, password:password }, 
		    function(returnedData){
		          localStorage.user = returnedData._id
		          window.location.replace("/home");
		}).fail(function(){
		       alert("Try again, did not work")
		});
	});

	function createList(userId){
		$.post('http://localhost:3000/lists/'+ userId, {}, 
		    function(returnedData){
		          localStorage.user = returnedData._id
		}).fail(function(){
		       alert("Try again, did not work")
		});
	}
});