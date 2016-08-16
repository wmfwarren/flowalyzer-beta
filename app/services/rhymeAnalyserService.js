"use strict";

app.service("flowalyzer", function(){
	//this funciton analyzes for the pattern [vowelgroup](consonant)
	//within 60 chars of the match set
	this.RhymeMatrix = function() {
		//strict rhymes
		this.numOfTwoCharMatches = 0;
		this.numOfThreeCharMatches = 0;
		this.numOfFourCharMatches = 0;
		this.numOfTwoCharMatchesArray = [];
		this.numOfThreeCharMatchesArray = [];
		this.numOfFourCharMatchesArray = [];
		//slant rhyme
		this.numOfSoftTwoCharMatches = 0;
		this.numOfSoftThreeCharMatches = 0;
		this.numOfSoftFourCharMatches = 0;
		this.numOfSoftTwoCharMatchesArray = [];
		this.numOfSoftThreeCharMatchesArray = [];
		this.numOfSoftFourCharMatchesArray = [];
		//methods
		this.twoCharMatcher = function(flowString){
			let flowLength = flowString.length;
			for(let i = 0; i < flowLength; i++){
				let indexArray = [];
				let charOne = null;
				let charTwo = null;
				//find the string to match
				if(i < flowLength - 2){
					charOne = flowString.charAt(i);
					charTwo = flowString.charAt(i + 1);
				} else {
					charOne = flowString.charAt(flowLength - 2);
					charTwo = flowString.charAt(flowLength - 1);
				}
				//compare to other parts of the string
				let stringToMatch = charOne + charTwo;
				for(let j = 1; j <= 60 ; j++){
					if ((i - j) < 0){

					} else if (flowString.charAt(i - j) === charOne //exact match with a vowel of diphthong
						&& flowString.charAt(i - j + 1) === charTwo
						&& stringToMatch.search(/[aeiou123456]/) !== -1){
						indexArray.push(i - j);
					}
				}//end of matching array.
				let matchNumber = indexArray.length;
				this.numOfTwoCharMatchesArray.push({stringToMatch, matchNumber, indexArray}); //-1 so it doesnt always match
				this.numOfTwoCharMatches += matchNumber;
			}//end of main for loop
		};//end of 2 char matcher

		this.threeCharMatcher = function(flowString){
			let flowLength = flowString.length;
			let stringArray = [];
			console.log("flow string length", flowLength );
			for(let i = 1; i < flowLength; i++){
				let uniqueIndexArray = [];
				let indexArray = [];
				let charOne = null;
				let charTwo = null;
				let charThree = null;
				//find the string to match
				if(i < flowLength - 3){
					charOne = flowString.charAt(i);
					charTwo = flowString.charAt(i + 1);
					charThree = flowString.charAt(i + 2);
				} else {
					charOne = flowString.charAt(flowLength - 3);
					charTwo = flowString.charAt(flowLength - 2);
					charThree = flowString.charAt(flowLength - 1);
				}
				let stringToMatch = charOne + charTwo + charThree;
				//compare to other parts of the string
				// for(let j = 0; j <= 60 ; j++){
				// 	if (i - j < 0){

				// 	} else if (flowString.charAt(i - j) === charOne //exact match with a vowel of diphthong
				// 		&& flowString.charAt(i - j + 1) === charTwo
				// 		&& flowString.charAt(i - j + 2) === charThree
				// 		&& stringToMatch.search(/[aeiou123456]/) !== -1){
				// 		indexArray.push(i - j);
				// 	}
				// }//end of matching array.

			stringArray.push({stringToMatch, indexArray});

			}//end of main for loop

			// console.log("stringArray", stringArray);
			// for(let i = 0; i < stringArray.length; i++){
			// 	let occurenceCounter = 0;
			// 	for(let j = 0; j < stringArray.length; j++){
			// 		if(stringArray[i].stringToMatch === stringArray[j].stringToMatch){
			// 			occurenceCounter++;
			// 		}
			// 	}//close of j inner loop
			// 	if(occurenceCounter > 0 && ){
			// 		this.numOfThreeCharMatchesArray.push({stringToMatch: stringArray[i].stringToMatch, occurenceCounter});
			// 	}
			}// end of cleanup loop
		};//end of 3 char matcher
//////////
	}; //end of rhyme matrix
})//end of service