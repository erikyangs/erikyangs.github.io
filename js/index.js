$(document).ready(function(){
	//====NAVBAR====
	//animate rotate from http://stackoverflow.com/questions/15191058/css-rotation-cross-browser-with-jquery-animate
	$.fn.animateRotate = function(startAngle, angle, duration, easing, complete) {
	  var args = $.speed(duration, easing, complete);
	  var step = args.step;
	  return this.each(function(i, e) {
	    args.complete = $.proxy(args.complete, e);
	    args.step = function(now) {
	      $.style(e, 'transform', 'rotate(' + now + 'deg)');
	      if (step) return step.apply(e, arguments);
	    };

	    $({deg: startAngle}).animate({deg: angle}, args);
	  });
	};

	//menu animations + logic
	var isMenuDown = false;
	function menuDown(){
		$('#menu-chevron').animateRotate(0, -180, 100);
		$('nav ul').animate({
			top:'0vh'
		}, 400);
		isMenuDown = true;
	}
	function menuUp(){
		$('#menu-chevron').animateRotate(-180, 0, 200);
		$('nav ul').animate({
			top:'-100vh'
		}, 400);
		isMenuDown = false;
	}
	$("#mobile-menu-icon").click(function(){
		if(isMenuDown){
			menuUp();
		}
		else{
			menuDown();
		}	
	});
	$("nav a").click(function(){
		menuUp();
	});

	//animated scrolling
    //select all a with href containing # but not just "#"
    $('a[href*="#"]:not([href="#"])').click(function(e) {
        e.preventDefault();
        //section = #projects, #contact, etc.
        var section = $(this).attr("href");
        var navHeight = $("nav").height();
        //use scroll difference to calculate animation time
        var scrollDifference = Math.abs($(section).offset().top - navHeight - $(window).scrollTop());
        var animationTime = scrollDifference/$(document).height()*1000*1.5;
        //animation
        $("html, body").animate({
            scrollTop: $(section).offset().top - navHeight
        }, animationTime);
    });

	//====PARTICLES====
	particlesJS.load('particles-js', 'js/particles.json', function() {
	  console.log('callback - particles.js config loaded');
	});

	//====PROJECTS====
	//constants
	var username = "erikyangs";
	var githubAPIURL = "https://api.github.com/users/";
	var githubRepoURL = githubAPIURL + username + "/repos";
	//HTML to enter; TODO: pull from another page to add
		var projectHTML_1 = "<div class='col-sm-4 project-container'><div class=project>"
		//"<h3>Project 1</h3>"
		//"<span>Description would go here</span>"
		var projectHTML_2 = "<div class='center-container text-center'>";
		//add links
		var projectHTML_3 = "<div class=button>Source Code</div>";
		var projectHTML_3B = "<div class='button-disabled'>Source Code</div>";
		var projectHTML_4 = "<div class=button>View Project</div>";
		var projectHTML_4B = "<div class='button-disabled'>View Project</div>";
		var projectHTML_5 = "</div></div></div>";
	//HTML-appending code
	function addProjects(data){
		var projectHTML = "";

		for (var index in data){
			repo = data[index];
			console.log("Adding: " + repo.name + ": " + repo.description + "\n with repo URL:" + repo.html_url + "\n and HTML URL: " + repo.homepage);
			//row end/start
			if(index%3==0){
				if(index!=0){
					projectHTML += "</div>"
				}
				projectHTML += "<div class=row>";
			}
			//add project
			projectHTML += projectHTML_1 + "<h3>" + repo.name + "</h3>" + "<span>" + repo.description + "</span>";
			projectHTML += projectHTML_2;
			if(repo.html_url){
				projectHTML += "<a href = " + repo.html_url + " target='_blank'>" + projectHTML_3 +"</a>";
			}
			if(repo.homepage){
				projectHTML += "<a href = " + repo.homepage + " target='_blank'>" + projectHTML_4 +"</a>";
			}
			projectHTML+=projectHTML_5;
		}
		//row end
		projectHTML+="</div>"

		$("#projects").append(projectHTML);
	}
	//homemade web scraper
	$.get(githubRepoURL)
		.done(function(data){
			//check if get works
			if(data && data!=null && data instanceof Array){
				console.log("Github Repo List loaded from " + githubRepoURL);
				addProjects(data);
			}
			else{
				console.error("Data was null or not expected format. Failed to load repos from: " + githubRepoURL);
				$("#github-projects-header").remove();
			}
		})
		.fail(function(jqHXR, textStatus, errorThrown){
			console.error("Error with using get from: " + githubRepoURL + " from error " + errorThrown);
			$("#github-projects-header").remove();
		});
});