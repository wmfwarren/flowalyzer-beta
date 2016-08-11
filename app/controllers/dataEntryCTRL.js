"use strict";

app.controller("dataEntryCTRL", function ($scope, $route, dataFactory, metaphoneService) {
	$scope.flowInput = null;
	var rawObject = new metaphoneService.RawFlow();

	$scope.input = function (){
		console.log("Flow to Check", $scope.flowInput);
		rawObject.rawInput = $scope.flowInput;
		rawObject.rawCleaner();
		rawObject.lineBreaker();
		rawObject.wordBreaker();
		console.log(rawObject, "rawObject");

	};
})