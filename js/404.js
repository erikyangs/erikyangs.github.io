var numOfShines=1;
$(document).on("click", function(e) {
	$("body").append("<img src='/img/shine.png' alt='blip' class='shine' id='shine" + numOfShines +"''></img>");
	$("#shine"+numOfShines).css("top",e.pageY);
	$("#shine"+numOfShines).css("left",e.pageX);
	numOfShines++;
});