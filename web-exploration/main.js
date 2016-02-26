var x = 0;
window.setInterval(function(){
	if(x==0){
		$(".container").css("background-color", "yellow");
		$(".center").css("background-color", "black");
		$(".center").css("color", "yellow");
		x++;
	}
	else{
		$(".container").css("background-color", "black");
		$(".center").css("background-color", "yellow");
		$(".center").css("color", "black");
		x--;
	}
}, 10);