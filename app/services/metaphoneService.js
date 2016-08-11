"use strict";

app.service("metaphoneService", function(){

	this.MetaData = function(){
		this.artist = null; //the artist whose album it is
		this.album = null; //the album
		this.track = null; //the track
		this.rapper = null; //the rapper who is actually rappin the flow
		this.note = null;
	};

	this.RawFlow = function(){
		//values
		this.rawInput = null;
		this.rawCleaned = null; //all punctuations removed
		this.rawFlowByLine = null; //array of each line
		this.rawFlowByWord = []; //2d array of words by line
		//methods
			//method to clean of punctuations
		this.rawCleaner = function(){
			this.rawCleaned = this.rawInput.replace(/[.,\/#!$%\^&\*;'":{}=\-_`~()]/g,"").toLowerCase();
		};
			//method to break at line breaks
		this.lineBreaker = function(){
			this.rawFlowByLine = this.rawCleaned.split(/\n/);
		};
			//method to break at words
		this.wordBreaker = function(){
			for(let i = 0; i < this.rawFlowByLine.length; i++){
				this.rawFlowByWord.push(this.rawFlowByLine[i].split(/ /));
			}
		}
	};

	this.MetaphonedFlow = function(){
		this.cleanedMP = null; //the punctuation free metaphoned version of the flow
		this.singleStringMP = null; //Spaces removed to sort by character
		this.byLineMP = null; //the line by line breakdown of the flow
		this.byWordMP = []; // the by word breakdown 2D array
		//methods
			//metaphone converter
		this.metaphoner = function(flow){ //word for word flow
			this.byWordMP = flow;
			console.log("this.byWordMP", this.byWordMP );
		 	for(let i = 0 ; i < flow.length ; i++){
		 		for(let j = 0 ; i < flow[i].length ; j++){
		 			let currentWord = this.byWordMP[i][j];
		 			currentWord = currentWord.replace(/\n/, " \n "); //prep for step 2, 3
					//1. drop double letters to single except c
					currentWord = currentWord.replace(/[^\w\s]|([bdfghjklmnpqrstvwxyzaeiou])(?=\1)/g, "");
					//2. If the word begins with 'KN', 'GN', 'PN', 'AE', 'WR', drop the first letter
					currentWord = currentWord.replace(/^kn/g, "n");
					currentWord = currentWord.replace(/^gn/g, "n");
					currentWord = currentWord.replace(/^pn/g, "n");
					currentWord = currentWord.replace(/^ae/g, "e");
					currentWord = currentWord.replace(/^wr/g, "r");
					//3. Drop 'B' if after 'M' at the end of the word.
					currentWord = currentWord.replace(/mb$/, "m"); //need to fix since right not it wakes out in middle of a word too
					//4. 'C' transforms to 'X' if followed by 'IA' or 'H' (unless in latter case, it is part of '-SCH-', in which case it transforms to 'K').
				  //'C' transforms to 'S' if followed by 'I', 'E', or 'Y'. Otherwise, 'C' transforms to 'K'.
				  currentWord = currentWord.replace(/sch/g, "skh");
					currentWord = currentWord.replace(/cia/g, "xia");
					currentWord = currentWord.replace(/ch/g, "xh");
					currentWord = currentWord.replace(/ci/g, "si");
					currentWord = currentWord.replace(/ce/g, "se");
					currentWord = currentWord.replace(/cy/g, "sy");
					currentWord = currentWord.replace(/c/g, "k");
					//5. 'D' transforms to 'J' if followed by 'GE', 'GY', or 'GI'. Otherwise, 'D' transforms to 'T'.
					currentWord = currentWord.replace(/dge/g, "j");
					currentWord = currentWord.replace(/dgy/g, "j");
					currentWord = currentWord.replace(/dgi/g, "j");
					currentWord = currentWord.replace(/d/g, "t");
					//6. Drop 'G' if followed by 'H' and 'H' is not at the end or before a vowel. 
					//   Drop 'G' if followed by 'N' or 'NED' and is at the end.

					//set the word back
					this.byWordMP[i][j] = currentWord;
					}
				}
		};
			//stringifier
			//line seperator
			//word seperator
			//string matcher for 2,3,4,5,6 char strings at 20,40,60 characters ahead
	};

})