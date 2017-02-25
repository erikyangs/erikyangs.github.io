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
    particlesJS.load('particles-js', 'https://erikyangs.github.io/js/particles.json', function() {
      console.log('callback - particles.js config loaded');
    });
});

//====PROJECTS====
//constants
var username = "erikyangs";
var githubAPIURL = "https://api.github.com/users/";
var githubRepoURL = githubAPIURL + username + "/repos";

var app = angular.module("projects-app",[]);
app.controller("projects-controller", function($scope, $http){
    $http.get(githubRepoURL)
    .then(function(response){
        var projects = [];
        for(var i = 0;i<response.data.length;i++){
            var project = response.data[i];
            if (project.name && project.description){
                projects.push(project);
            }
        }
        $scope.githubprojects = projects;
    });

    $scope.otherprojects = [
        {
            "img_url" : "img/projects/EOP.jpg",
            "name" : "UC Berkeley Educational Opportunity Program",
            "description" : "Website designed for UC Berkeley's Educational Opportunity Program, which provides first generation and low-income students with guidance and resources.",
            "html_url": "",
            "homepage": "http://eop.berkeley.edu/",
        },
        {
            "img_url" : "img/projects/BearMaps.jpg",
            "name" : "BearMaps",
            "description" : "Web application that rasterizes map images and routes directions between points using A* path-finding. Code available upon request.",
        },
        {
            "img_url" : "img/projects/UNRAC.jpg",
            "name" : "UN Refugee Agency at Cal",
            "description" : "Website designed for student organization at UC Berkeley raising awareness about refugees around the world.",
            "html_url": "https://github.com/UNRAC/unrac.github.io",
            "homepage": "https://www.ocf.berkeley.edu/~unrac/#/",
        },
        {
            "img_url" : "img/projects/FZCF.jpg",
            "name" : "FengZheng Cultural Foundation Website",
            "description" : "Website designed for charity organization in Texas promoting education equality.",
            "html_url": "https://github.com/fzcf/fzcf.github.io",
            "homepage": "http://fzculturalfoundation.org/index.html",
        },
    ];
});