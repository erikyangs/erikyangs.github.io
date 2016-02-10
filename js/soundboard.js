var keyCodes={
	//alphabet
	A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,
	//special
	Semicolon:186, Comma:188, Period:190, Slash:191
};



//key is A,S,...
//keyCodes[key] is 65,83,...
$(document).on("keydown", function(e){
	for(var key in keyCodes){
		if (e.keyCode==keyCodes[key]){
			$("#key"+key).addClass("keydown");
			var audioElement = document.createElement('audio');
			audioElement.setAttribute('src', 'shine.wav');
	    	audioElement.play();
		}
	}
});

$(document).on("keyup", function(e){
	for(var key in keyCodes){
		if (e.keyCode==keyCodes[key]){
			$("#key"+key).removeClass("keydown");
		}
	}
});

/* Code used to create dictionary of letters
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var str = "";
var c = 65;
for(i in alphabet){
	str+=alphabet[i]+":"+c+","
	c++;
}
console.log(str);
*/