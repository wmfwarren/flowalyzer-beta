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
			this.rawCleaned = this.rawInput.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
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
			//stringifier
			//line seperator
			//word seperator
			//string matcher for 2,3,4,5,6 char strings at 20,40,60 characters ahead
	};

})