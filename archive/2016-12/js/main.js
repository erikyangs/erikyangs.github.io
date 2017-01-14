//Site-wide js

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
});