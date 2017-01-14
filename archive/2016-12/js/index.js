//Page-specific js

$(document).ready(function() {
	var images = ["1.jpg", "2.jpg", "3.jpg", "datboi.gif", "ProfilePic.jpg"];
	var index = 0;
	setInterval(function() {
			var current = images[index % images.length];
			$("#profilepic").css("background-image", "url(img/" + current + ")");
			index++;
		},
		4000);
});