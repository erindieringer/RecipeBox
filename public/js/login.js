$(function() {

	// If signup if clicked create new user and send to homepage
	$("#signup").click(function(e){
		var username = $("#username").val();
		var password = $("#password").val();
		if (username.length === 0 || password.length === 0){
			alert("Please Complete all fields");
		} else {
			$.post('/signup', { username: username, password:password }, 
			    function(returnedData){
			        localStorage.user = returnedData._id
			        createList(returnedData._id); // Create empty grocery list for newly signed up user

			        window.location.replace("/home");

			}).fail(function(){
			       alert("Try again, did not work")
			});
		}
	});

	// If login pressed, autheticate and take user to home
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

	// Creates empty grocery list instance for new users
	function createList(userId){
		$.post('/lists/'+ userId, {}, 
		    function(returnedData){
		}).fail(function(){
		       
		});
	}
});