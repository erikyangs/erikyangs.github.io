//send me to the depths of the shadow realm for doing this
var numOfShines=1;
$(document).on("click", function(e) {
	$("body").append("<img src='/img/shine.png' alt='blip' class='shine' id='shine" + numOfShines +"''></img>");
	$("#shine"+numOfShines).css("top",e.pageY-25);
	$("#shine"+numOfShines).css("left",e.pageX-25);
	numOfShines++;
});

$(document).ready(function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'audio.mp3');
    //audioElement.setAttribute('autoplay', 'autoplay');
    //audioElement.load()
	
    //$.get();
	/*
    audioElement.addEventListener("load", function() {
        audioElement.play();
    }, true);*/

    $('body').click(function() {
        audioElement.play();
        setTimeout(function(){
        	audioElement.pause();
        }, 500);
    });
});