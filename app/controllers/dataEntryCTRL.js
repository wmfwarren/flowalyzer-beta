"use strict";

app.controller("dataEntryCTRL", function ($scope, $route, dataFactory, metaphoneService, flowalyzer) {
	$scope.flowInput = null;
	const rawObject = new metaphoneService.RawFlow();
	const metaphoneObject = new metaphoneService.MetaphonedFlow();
	const rhymeMatrixObject = new flowalyzer.RhymeMatrix();

	$scope.input = function (){
		console.log("Flow to Check", $scope.flowInput);
		rawObject.rawInput = $scope.flowInput;
		rawObject.rawCleaner();
		rawObject.lineBreaker();
		rawObject.wordBreaker();
		console.log(rawObject, "rawObject");
		metaphoneObject.metaphoner(rawObject.rawFlowByWord);
		console.log("metaphoned obj", metaphoneObject);
		rhymeMatrixObject.twoCharMatcher(metaphoneObject.singleStringMP);
		rhymeMatrixObject.threeCharMatcher(metaphoneObject.singleStringMP);
		console.log("rhyme matrix", rhymeMatrixObject);
	};
})