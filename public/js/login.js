$(function() {
	$("#signup").click(function(e){
		var username = $("#username").val();
		var password = $("#password").val();
		$.post('/signup', { username: username, password:password }, 
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
		$.post('/login', { username: username, password:password }, 
		    function(returnedData){
		          localStorage.user = returnedData._id
		          window.location.replace("/home");
		}).fail(function(){
		       alert("Try again, did not work")
		});
	});

	function createList(userId){
		$.post('/lists/'+ userId, {}, 
		    function(returnedData){
		}).fail(function(){
		       
		});
	}
});