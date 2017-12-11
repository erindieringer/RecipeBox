$(function() {
	$("#signup").click(function(e){
		var username = $("#username").val();
		var password = $("#password").val();
		$.post('https://erin328-recipe-box.herokuapp.com/signup', { username: username, password:password }, 
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
		$.post('https://erin328-recipe-box.herokuapp.com/login', { username: username, password:password }, 
		    function(returnedData){
		          localStorage.user = returnedData._id
		          window.location.replace("/home");
		}).fail(function(){
		       alert("Try again, did not work")
		});
	});

	function createList(userId){
		$.post('https://erin328-recipe-box.herokuapp.com/lists/'+ userId, {}, 
		    function(returnedData){
		}).fail(function(){
		       
		});
	}
});