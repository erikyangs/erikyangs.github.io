$(document).ready(function() {
	$("#cover").hide();
	$("body").hide().fadeIn(300);

	$("a").click(function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		$("body").fadeOut(300);
		setTimeout(function() {
			window.location.href = url;
		}, 300);
	});

	var images = ["1.jpg", "2.jpg", "3.jpg", "ProfilePic.jpg"];
	var index = 0;
	setInterval(function() {
			var current = images[index % images.length];
			$("#profilepic").css("background-image", "url(img/" + current + ")");
			index++;
		},
		4000);
});