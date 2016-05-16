
var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider

	.when('/',{
		templateUrl:'views/home.html',
		controller: 'mainController'
	})
	.otherwise({ 
		redirectTo: '/'
	});
});

app.controller('mainController', [function(){
}]);
