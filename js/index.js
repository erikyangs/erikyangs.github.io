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
    var projectHTMLURL = "https://erikyangs.github.io/views/projectHTMLTemplate.json";

    //HTML-appending code
    String.prototype.replaceBracketsWith = function (textToInsert){
        return this.replace("{}", textToInsert);
    }
    function addProjects(data, projectHTMLTemplate){
        var projectHTML = "";
        var i = 0;  

        for (var index in data){
            repo = data[index];
            if(!repo.name || !repo.description){
                console.log("Skipping repo: " + repo.name + ": " + repo.description + "\n with repo URL:" + repo.html_url + "\n and HTML URL: " + repo.homepage);
                continue;
            }
            console.log("Adding repo: " + repo.name + ": " + repo.description + "\n with repo URL:" + repo.html_url + "\n and HTML URL: " + repo.homepage);
            
            //row end/start
            if(i%3==0){
                if(i!=0){
                    projectHTML += "</div>"
                }
                projectHTML += "<div class=row>";
            }
            
            //add project
            if(repo.name){
                projectHTML += projectHTMLTemplate[0] + projectHTMLTemplate[1].replaceBracketsWith(repo.name);
            }
            if(repo.description){
                projectHTML += projectHTMLTemplate[2].replaceBracketsWith(repo.description);
            }
            projectHTML += projectHTMLTemplate[3];
            if(repo.html_url){
                projectHTML += projectHTMLTemplate[4].replaceBracketsWith(repo.html_url);
            }
            if(repo.homepage){
                projectHTML += projectHTMLTemplate[5].replaceBracketsWith(repo.homepage);
            }
            projectHTML+=projectHTMLTemplate[6];

            i++;
        }
        //row end
        projectHTML+="</div>"

        $("#github-projects-header").after(projectHTML);
    }

    //homemade web scraper
    function getfromURL(URL, success=function(){}, fail=function(){}, dataType=String){
        $.get(URL)
            .done(function(data){
                //check if get works
                if(data && data!=null && data instanceof dataType){
                    console.log("Data loaded from " + URL);
                    success(data);
                }
                else{
                    console.error("Data was null or not expected format " + dataType + ". Failed to load from: " + URL);
                    fail();
                }
            })
            .fail(function(jqHXR, textStatus, errorThrown){
                console.error("Error with using get from: " + URL + " from error " + errorThrown);
                fail();
            });
    }
    
    //gets repo data from Github API
    function getGithubRepoData(projectHTML){
        //if success, add projects, if not, remove header
        getfromURL(githubRepoURL,
            function(repoData) {
                addProjects(repoData, projectHTML);
            },
            function() {
                $("#github-projects-header").remove();
            },
            Array
            );
    }
    //gets HTML template from personal views/projects.json
    getfromURL(projectHTMLURL, 
        function(projectHTML){
            getGithubRepoData(projectHTML);
        },
        function() {
            $("#github-projects-header").remove();
        },
        Array
        );

});