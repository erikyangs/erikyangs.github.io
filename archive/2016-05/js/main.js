$(document).ready(function() {
	$("#nav").find("a").click(function(e) {
	    e.preventDefault();
	    var section = $(this).attr("href");
	    $("html, body").animate({
	        scrollTop: $(section).offset().top
	    }, 1500, "easeOutExpo");
	});

	var t = ["CODE", "INNOVATE", "DESIGN", "HACK", "COLLABORATE", "FILM", "ADVENTURE"];
    var counter = 0;
    change();
    setInterval(change, 1000);
    function change() {
		$("#todesign").text(t[counter]);
        counter++;
        if(counter >= t.length){
        	counter = 0;
        }
    }

});