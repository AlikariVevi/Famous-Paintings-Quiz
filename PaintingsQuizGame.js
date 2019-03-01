var totalPaintings = {
"blackname":"black",
"whitename":"white",
"redname":"red",
"bluename":"blue",
"greenname":"green",
"orangename":"orange",
"purplename":"purple",
"cadetbluename":"cadetblue",
"dimgrayname":"dimgray",
"lightsalmonname":"lightsalmon"
}

var totalPainters = {
"blac":"blackpainter",
"white":"whitepainter",
"red":"redpainter",
"blue":"bluepainter",
"green":"greenpainter",
"orange":"orangepainter",
"purple":"purplepainter",
"cadetblue":"cadetbluepainter",
"dimgrayr":"dimgraypainter",
"lightsalmon":"lightsalmonpainter"
}

// \\\\\\\\\\\\\\\\\ //
// GLOBAL VARIABLES  //
// ///////////////// //
var backgroundColor = "rgb(39, 34, 48)";
var holders = document.querySelectorAll(".holder");
var messageDisplay = document.querySelectorAll(".message");

var easy = document.querySelector("#easy");
var medium = document.querySelector("#medium");
var hard = document.querySelector("#hard");

var difficultyList = [3,6,9];
var gameModeList = [totalPaintings,totalPainters];

var gameMode = gameModeList[0]


// ////////////////////
// BUTTONS //
// reset Game Button
var resetButton = document.querySelector("#reset");
//toggle paintings and painters BUtton
var toggleButton  = document.querySelector("#TogglePP");
// Toggle button (Paintings/Painters) 
// reset Game with Toggle button(Paintings/Painters) 
toggleButton.addEventListener("click",function(){
	if(this.classList.contains("images")){
		this.classList.remove("images");
		this.classList.add("painters")
		this.textContent = "painters";
		Reset(holders,difficultyList,gameModeList[1]);
	}else if(
	// reset Game with Toggle(Paintings/Painters)	this.classList.remove("painters");
		this.classList.contains("painters")){
		this.classList.remove("painters");
		this.classList.add("images")
		this.textContent = "Paintings";
		Reset(holders,difficultyList,gameModeList[0]);
	}
});
// NewPaintings/NewGame Button
// reset Game with Button NewPaintings/NewGame 
resetButton.addEventListener("click",function(){
	ResetMode(holders,gameModeList,toggleButton)
	}
);

function ResetMode(holders,gameModeList,toggleButton){
	if(toggleButton.classList.contains("images")){
		Reset(holders,difficultyList,gameModeList[0]);
	}else if(toggleButton.classList.contains("painters")){
		Reset(holders,difficultyList,gameModeList[1]);
	}
}

var paintingsBar  = document.querySelector("#paintingsBar");
paintingsBar.addEventListener("click",function(){
	toggleButton.classList.remove("painters");
	toggleButton.classList.add("images")
	toggleButton.textContent =  "Paintings";
	Reset(holders,difficultyList,gameModeList[0]);
	
})


var paintersBar  = document.querySelector("#paintersBar");
paintersBar.addEventListener("click",function(){
	toggleButton.classList.remove("images");
	toggleButton.classList.add("painters")
	toggleButton.textContent = "painters";
	Reset(holders,difficultyList,gameModeList[1]);
})

Difficulty(difficultyList,holders);
NewGame(difficultyList[1],gameMode)

///////////////////////
// \\\\\\\\\\\\\\\\\ //
//     FUNCTIONS     //
// ///////////////// //
///////////////////////

/////////////////////
//  RESET FUNCTION //
/////////////////////
// inout
	// holders -> containers
	// difficultyList -> list of numbers
	// gameMode -> object(dictionary) 
		// mode paintings
		// mode painters
// Global variables
	//  easy
	//  medium 
	//  hard
function Reset(holders,difficultyList,gameMode){
	CleanHolders(holders);
	messageDisplay[0].textContent = "";
	messageDisplay[1].textContent = "Chooce one correct painting";
	// restebuttin message
	resetButton.textContent = "New Paintings"
	if(easy.classList.contains("selected")){
		NewGame(difficultyList[0],gameMode)
	}else if(medium.classList.contains("selected")){
		NewGame(difficultyList[1],gameMode)
	}else if(hard.classList.contains("selected")){
		NewGame(difficultyList[2],gameMode)
	}

};


// CLEAR PAINTINGS HOLDERS
// input hol -> container
function CleanHolders(hol){
	for (var i = 0; i < 9; i++){
		// delete the painting
		hol[i].style.backgroundSize = "100% 100%";
		hol[i].style.background = backgroundColor ;
	}
	};
///////////////////////////////////////////////////////
// CHANGING DIFFICULTY with Buttons Easy/Medium/Hard //
///////////////////////////////////////////////////////
// Global variables
	// var easy = document.querySelector("#easy");
	// var medium = document.querySelector("#medium");
	// var hard = document.querySelector("#hard");
function Difficulty(self,holders){
	easy.addEventListener("click",function(){
		easy.classList.add("selected");
		medium.classList.remove("selected");
		hard.classList.remove("selected");
		// restebuttin message
		resetButton.textContent = "New Paintings"
		CleanHolders(holders);
		if(toggleButton.classList.contains("images")){
			NewGame(self[0],gameModeList[0]);
		}else if(toggleButton.classList.contains("painters")){
			NewGame(self[0],gameModeList[1]);
		}
	})
	medium.addEventListener("click",function(){
		easy.classList.remove("selected");
		medium.classList.add("selected");
		hard.classList.remove("selected");
		// restebuttin message
		resetButton.textContent = "New Paintings"
		CleanHolders(holders);
		if(toggleButton.classList.contains("images")){
			NewGame(self[1],gameModeList[0]);
		}else if(toggleButton.classList.contains("painters")){
			NewGame(self[1],gameModeList[1]);
		}
	})		
	hard.addEventListener("click",function(){
		easy.classList.remove("selected");
		medium.classList.remove("selected");
		hard.classList.add("selected");
		// restebuttin message
		resetButton.textContent = "New Paintings"
		CleanHolders(holders);
		if(toggleButton.classList.contains("images")){
			NewGame(self[2],gameModeList[0]);
		}else if(toggleButton.classList.contains("painters")){
			NewGame(self[2],gameModeList[1]);
		}
	})
}

//////////////
// NEW GAME //
//////////////
// Global variables
	// totalPaintings
// input 
	// difficulty -> numbers
	// total -> object(dictionary)
function NewGame(difficulty,total){

	QuestionMessage(total);

	paintingNames = Object.keys(total);
	paintingImages = Object.values(total);

	// creating a list with difficulty number of objects
	Names = generatePaintings(difficulty,paintingNames);
	
	// 
	paintings = SelectedPaintings(Names);

	// key of painting
	correctAnswer = pickOneOfMany(Object.keys(paintings));//name of painying/painter
	

	// value of painying
	correctAnswerImage = paintings[correctAnswer];

	paintingName = document.querySelector("#paintingName");
	paintingName.textContent = correctAnswer;
	
	scrollNav = document.querySelector("#scrollNav");
	scrollNav.textContent = correctAnswer;

	loadPaintings(holders,paintings);
	
	// Question Message
	// input total -> object(dictionary)
	function QuestionMessage(total){
	if(total===totalPaintings){
		document.querySelector("#Question").textContent = "Which one is named  "
	} else if(total===totalPainters){
		document.querySelector("#Question").textContent = "Which one was painted by  "
	}
	};
	
	// Greating new List from the Choocen Paintings
	// input Names -> list
	// globel  variable -> total 
	function SelectedPaintings(Names){
		temp=[]
		for (var i = 0; i < Names.length; i++) {
			OneOfMany = pickOneOfMany(total[Names[i]]);
			temp.push([Names[i], OneOfMany])
		}
		Object.fromEntries = arr => Object.assign({}, ...Array.from(arr, ([k, v]) => ({[k]: v}) ));
		return Object.fromEntries(temp)
	}

	// Load paintings to holders
	// input
		// self -> list
		//  obj -> object(dictionary)
	function loadPaintings(self,obj){
		var tempValues = Object.values(obj);
		var tempLength = Object.values(obj).length;
		// var tempKey = Object.key(obj);
		// loop through all paintingHolders
		for (var i = 0; i < tempLength; i++){
			// sizing paintings
			self[i].style.backgroundSize = "100% 100%";
			// insert paintings
		 	self[i].style.backgroundImage = tempValues[i];
			// check the answer with the value
			self[i].addEventListener("click",function(){paintingChoice(this)});
		}
			
		
	};
	
	// Checking if palyer's choice is correct
	// input
		// self -> holder/container/div/area
		// global var -> correctAnswerImage
	function paintingChoice(self){
		// the given answer with the value value
		var clickedPainting = self.style.backgroundImage;
		// check if it is correct
		if(clickedPainting==correctAnswerImage){
			for(var j=0;j< messageDisplay.length;j++){
				messageDisplay[j].textContent = "Correct!";
				}
			changePainting(correctAnswerImage);
			resetButton.textContent = "Play Again";
			// // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			// // crashes after few renewals
			// // 
			// setTimeout(function(){ResetMode(holders,gameModeList,toggleButton)},2000);

		} else{
			self.style.background = backgroundColor ;
			for(var j=0;j< messageDisplay.length;j++){
				messageDisplay[j].textContent = "Try Again";
				}
		};
	};

	// All holders load with the same Image
	// input self -> image
	function changePainting(self){
		// loop through all paintingHolders
		for (var i = 0; i < Object.keys(paintings).length; i++){
			// change the painting
			holders[i].style.backgroundSize = "100% 100%";
			holders[i].style.backgroundImage= self;
		}

	};

	// radon select from a list
	// input self -> list
	function pickOneOfMany(self){
		var rad = Math.floor(Math.random()*self.length);
		return self[rad];
	};

	// rando, choice from a list
	// input 
		// num -> integer
		// TotalArray -> list
	function generatePaintings(num,TotalArray){
		//make array
		var arr = [] 
		// add num paintings
		for (var i = 0; i < num; i++) {
			//get random painting and add to array
			var rad = Math.floor(Math.random()*TotalArray.length);
			arr[i] = TotalArray[rad];
		}
		//return array
		return arr
	};

}

