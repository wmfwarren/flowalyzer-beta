"use strict";

const app = angular.module("flowAnalyzer" , ["ngRoute"])
.constant("firebaseURL", "https://lyric-analyzer-beta.firebaseio.com/");

app.config(function($routeProvider) {

	$routeProvider
	.when("/entry",{
		templateUrl: "partials/dataEntry.html",
		controller: "dataEntryCTRL"
	})
	.otherwise("/entry");
});