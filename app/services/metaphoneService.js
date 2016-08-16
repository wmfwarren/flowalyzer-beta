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
		this.noVowelCleanedMP = null;
		this.singleStringMP = null; //Spaces removed to sort by character
		this.byLineMP = []; //the line by line breakdown of the flow
		this.byWordMP = []; // the by word breakdown 2D array
		this.noVowelLineMP = [];
		this.noVowelWordMP = [];
		//methods
			//metaphone converter
		this.metaphoner = function(flow){ //word for word flow
			this.byWordMP = flow;
		 	for(let i = 0 ; i < flow.length ; i++){
		 		for(let j = 0 ; j < flow[i].length ; j++){
		 			let currentWord = this.byWordMP[i][j];
		 			//0. Alter dipthongs. 
		 			currentWord = currentWord.replace(/ou/g, "1");  
		 			currentWord = currentWord.replace(/igh/g, "2"); 
		 			currentWord = currentWord.replace(/oi/g, "3"); 
		 			currentWord = currentWord.replace(/oo/g, "4"); 
		 			if(currentWord.search(/.air/) !== -1){
		 				currentWord = currentWord.replace(/air/g, "5"); 
		 			}
		 			currentWord = currentWord.replace(/aire/g, "5"); 
		 			if(currentWord.search(/.are/) !== -1){
		 				currentWord = currentWord.replace(/are/g, "5"); 
		 			}
		 			currentWord = currentWord.replace(/ure/g, "6"); 
		 			//0.5 drop the second vowel in remaining double vowel combos
		 			while(currentWord.search(/[aeiou][aeiou]/) !== -1){
		 				let secondVowelIndex = currentWord.search(/[aeiou][aeiou]/) + 1;
		 				currentWord = currentWord.slice(0, secondVowelIndex) + currentWord.slice(secondVowelIndex + 1);
		 			}
		 			//0.75 drop trailing silent e's
		 			while(currentWord.search(/[aeiou].es/) !== -1){
		 				if(currentWord.charAt(currentWord.length - 2) === 'e'){
		 					currentWord = currentWord.slice(0, -2) + 's';
		 				}
		 			}
		 			if(currentWord.search(/.e/) !== -1 
		 				&& currentWord.length > 2){
		 				if(currentWord.charAt(currentWord.length - 1) === 'e'){
		 					currentWord = currentWord.slice(0, -1);
		 				}
		 			}
					//1. drop double letters to single except c
					currentWord = currentWord.replace(/[^\w\s]|([bdfghjklmnpqrstvwxyzaeiou])(?=\1)/g, "");
					//2. If the word begins with 'KN', 'GN', 'PN', 'AE', 'WR', drop the first letter
					currentWord = currentWord.replace(/^kn/g, "n");
					currentWord = currentWord.replace(/^gn/g, "n");
					currentWord = currentWord.replace(/^mn/g, "n"); //added to my version
					currentWord = currentWord.replace(/^kh/g, "k"); //added to my version
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
					currentWord = currentWord.replace(/dge/g, "jge");
					currentWord = currentWord.replace(/dgy/g, "jgy");
					currentWord = currentWord.replace(/dgi/g, "jgi");
					currentWord = currentWord.replace(/d/g, "t");
					//6. Drop 'G' if followed by 'H' and 'H' is not at the end or before a vowel. 
					//   Drop 'G' if followed by 'N' or 'NED' and is at the end.
					if(currentWord.search(/gh/) !== -1 
						&& currentWord.search(/gh/) !== currentWord.length - 2 
						&& currentWord.search(/gh[aeiou]/) === -1){
						let currentWordGHIndex = currentWord.search(/gh/);
						currentWord = currentWord.slice(0, currentWordGHIndex) + currentWord.slice(currentWordGHIndex +1);
					}	
					if(currentWord.search(/gn/) !== -1
						&& currentWord.search(/gn/) === currentWord.length - 2){
						let currentWordGNIndex = currentWord.search(/gn/);
						console.log("gn at", currentWordGNIndex);
						currentWord = currentWord.slice(0, currentWordGNIndex) + currentWord.slice(currentWordGNIndex +1);
					}
					//searching for "gned" but ds are "t" nos at the end of words 
					if(currentWord.search(/gnet/) !== -1 
						&& currentWord.search(/gnet/) === currentWord.length - 4){
						let currentWordGNEDIndex = currentWord.search(/gnet/);
						console.log("gnet at", currentWordGNEDIndex);
						currentWord = currentWord.slice(0, currentWordGNEDIndex) + currentWord.slice(currentWordGNEDIndex + 1);
					}
					//7. 'G' transforms to 'J' if before 'I', 'E', or 'Y', and it is not in 'GG'. Otherwise, 'G' transforms to 'K'.
						//"GG" will never show up because all double except cc were dropped step 1
					currentWord = currentWord.replace(/g/g, "k");
					currentWord = currentWord.replace(/gi/g, "ji");
					currentWord = currentWord.replace(/ge/g, "je");
					currentWord = currentWord.replace(/gy/g, "jy");
					//8. Drop 'H' if after vowel and not before a vowel.
					if(currentWord.search(/[aeiou]h/) !== -1
						&& currentWord.search(/[aeiou]h[aeiou]/) === -1){
						let indexOfH = currentWord.search(/[aeiou]h/) + 1;
						currentWord = currentWord.slice(0, indexOfH) + currentWord.slice(indexOfH + 1);
					}
					//9. replace CK with K
					currentWord = currentWord.replace(/ck/g, "k");
					currentWord = currentWord.replace(/kk/g, "k");
					//10. relace PH with F
					currentWord = currentWord.replace(/ph/g, "f");
					//11 Q > K
					currentWord = currentWord.replace(/q/g, "k");
					//12. 'S' transforms to 'X' if followed by 'H', 'IO', or 'IA'.
					currentWord = currentWord.replace(/sh/g, "xh");
					currentWord = currentWord.replace(/sio/g, "xio");
					currentWord = currentWord.replace(/sia/g, "xia");
					//13. T' transforms to 'X' if followed by 'IA' or 'IO'. 
					// 'TH' transforms to '0'. Drop 'T' if followed by 'CH'.
					currentWord = currentWord.replace(/tio/g, "xio");
					currentWord = currentWord.replace(/tia/g, "xia");
					currentWord = currentWord.replace(/th/g, "0");
					currentWord = currentWord.replace(/tch/g, "ch");
					//14. V > F
					currentWord = currentWord.replace(/v/g, "f");
					//15. 'WH' transforms to 'W' if at the beginning. 
					//Drop 'W' if not followed by a vowel.
					currentWord = currentWord.replace(/wh/, "w");
					if(currentWord.search(/w/) !== -1
						&& currentWord.search(/w[aeiou]/) === -1){
							let indexOfW = currentWord.search(/w/);
							currentWord = currentWord.slice(0, indexOfW) + currentWord.slice(indexOfW + 1);
					}
					//16. 'X' transforms to 'S' if at the beginning. 
					//Otherwise, 'X' transforms to 'KS'.
					currentWord = currentWord.replace(/x/, "s");
					currentWord = currentWord.replace(/x/g, "ks");
					//17. Drop 'Y' if not followed by a vowel.
					//17. ADDITION: keep trailing Ys
					while(currentWord.search(/y/) !== -1
						&& currentWord.search(/y[aeiou]/) === -1
						&& currentWord.search(/y/) !== currentWord.length -1){
						let indexOfY = currentWord.search(/y/);
						currentWord = currentWord.slice(0, indexOfY) + currentWord.slice(indexOfY + 1);
					}
					//18. Z > S
					currentWord = currentWord.replace(/z/g, "s");
					//19. Cull non-leading vowels (This is for real metaphone ONLY)
					//20. M > N
					currentWord = currentWord.replace(/m/g, "n");

					//set the word back
					this.byWordMP[i][j] = currentWord;
					}
				}
			this.metaByLineJoiner();
			this.metaByFlowJoiner();
			this.metaString();
			this.vowelCull();
			this.metaByLineJoinerNoVowels();
			this.metaByFlowJoinerNoVowels();
		};
			//stringifier

		this.metaByLineJoiner = function(){
			for(let i = 0; i < this.byWordMP.length; i++){
				this.byLineMP.push(this.byWordMP[i].join(" "));
			}
		};
		this.metaByFlowJoiner = function(){
			this.cleanedMP = this.byLineMP.join("\n");
		};
		this.metaString = function(){
			this.singleStringMP = this.cleanedMP.replace(/\s/g, "");
		}
		//getting rid of vowels
		this.vowelCull = function(){
			for(let i = 0 ; i < this.byWordMP.length ; i++){
		 		let currentLine =[]
		 		for(let j = 0 ; j < this.byWordMP[i].length ; j++){
		 			let currentWord = this.byWordMP[i][j];
		 			let leadingChar = currentWord.charAt(0);
		 			let endOfString = currentWord.substring(1);
		 			let vowelless = endOfString.replace(/[aeiou123456]/g, "");
		 			currentWord = leadingChar + vowelless;
		 			currentLine.push(currentWord);
		 			// this.noVowelWordMP[i][j] = currentWord;
		 		}
		 		this.noVowelWordMP.push(currentLine);
		 	}
		};
		this.metaByLineJoinerNoVowels = function(){
			for(let i = 0; i < this.noVowelWordMP.length; i++){
				this.noVowelLineMP.push(this.noVowelWordMP[i].join(" "));
			}
		};
		this.metaByFlowJoinerNoVowels = function(){
			this.noVowelCleanedMP = this.noVowelLineMP.join("\n");
		};

	};
})