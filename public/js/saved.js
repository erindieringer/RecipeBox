$(function() {
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
		// $.post('http://localhost:3000/lists', { items: JSON.stringify(list)}, 
		//     function(returnedData){
		//          console.log("sucess");
		// }).fail(function(){
		//        console.log("fail");
		// });
	}
});
