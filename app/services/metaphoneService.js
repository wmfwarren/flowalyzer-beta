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
		this.byWordMP = null; // the by word breakdown 2D array
		//methods
			//metaphone converter
		this.metaphoner = function(flow){
			flow = flow.replace(/\n/, " \n "); //prep for step 2, 3
			//1. drop double letters to single except c
			flow = flow.replace(/[^\w\s]|([bdfghjklmnpqrstvwxyzaeiou])(?=\1)/g, "");
			//2. If the word begins with 'KN', 'GN', 'PN', 'AE', 'WR', drop the first letter
			flow = flow.replace(/ kn/g, " n");
			flow = flow.replace(/ gn/g, " n");
			flow = flow.replace(/ pn/g, " n");
			flow = flow.replace(/ ae/g, " e");
			flow = flow.replace(/ wr/g, " r");
			//3. Drop 'B' if after 'M' at the end of the word.
			flow = flow.replace(/mb/, "m"); //need to fix
			//4. 'C' transforms to 'X' if followed by 'IA' or 'H' (unless in latter case, it is part of '-SCH-', in which case it transforms to 'K').
		  //'C' transforms to 'S' if followed by 'I', 'E', or 'Y'. Otherwise, 'C' transforms to 'K'.
		  flow = flow.replace(/sch/g, "skh");
			flow = flow.replace(/cia/g, "xia");
			flow = flow.replace(/ch/g, "xh");
			flow = flow.replace(/ci/g, "si");
			flow = flow.replace(/ce/g, "se");
			flow = flow.replace(/cy/g, "sy");
			flow = flow.replace(/c/g, "k");
			//5. 'D' transforms to 'J' if followed by 'GE', 'GY', or 'GI'. Otherwise, 'D' transforms to 'T'.
			flow = flow.replace(/dge/g, "j");
			flow = flow.replace(/dgy/g, "j");
			flow = flow.replace(/dgi/g, "j");
			flow = flow.replace(/d/g, "t");
			//6. 
			this.cleanedMP = flow;
		};
			//stringifier
			//line seperator
			//word seperator
			//string matcher for 2,3,4,5,6 char strings at 20,40,60 characters ahead
	};

})