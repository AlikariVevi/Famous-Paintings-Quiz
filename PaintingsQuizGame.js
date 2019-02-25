var totalPaintings = {
"url(\"paintings/Vincent-Van-Gogh/Starry-Night.jpg\")":"Starry Night",
"url(\"paintings/The-Birth-of-Venus.jpg\")":"The Birth Of Venus",
"url(\"paintings/The-Persistence-of-Memory.jpg\")":"The Persistence of Memory",
"url(\"paintings/the-creation-of-adam.jpg\")":"The Creation Of Adam",
"url(\"paintings/Guernica.jpg\")":"Guernica",
"url(\"paintings/night-watch.jpg\")":"Night Watch",
"url(\"paintings/autumn_rhythm.jpg\")":"Autumn Rhythm",
"url(\"paintings/Water-Lilies.jpg\")":"Water Lilies",
"url(\"paintings/Bain-a-la-Grenouillere.jpg\")":"Bain a la Grenouillere",
"url(\"paintings/the-Raft-of-the-Medusa.jpg\")":"The Raft Of The Medusa",
// "url(\"paintings/Vincent-Van-Gogh/night_cafe.jpg\")":"The Night Cafe",
// "url(\"paintings/Vincent-Van-Gogh/starry_night_rhone.jpg\")":"Starry Night Over the Rhone",
// "url(\"paintings/Vincent-Van-Gogh/bedroom.jpg\")":"Bedroom"
}

var totalPainters = {
"url(\"paintings/Vincent-Van-Gogh/Starry-Night.jpg\")":"Vincent van Gogh",
// "url(\"paintings/night_cafe.jpg\")":"Vincent van Gogh",
// "url(\"paintings/starry_night_rhone.jpg\")":"Vincent van Gogh",
// "url(\"paintings/bedroom.jpg\")":"Vincent van Gogh",
"url(\"paintings/The-Birth-of-Venus.jpg\")":"Sandro Botticelli",
"url(\"paintings/The-Persistence-of-Memory.jpg\")":"Salvador Dali",
"url(\"paintings/the-creation-of-adam.jpg\")":"Michelangelo",
"url(\"paintings/Guernica.jpg\")":"Pablo Picasso",
"url(\"paintings/night-watch.jpg\")":"Rembrandt",
"url(\"paintings/autumn_rhythm.jpg\")":"Jackson Pollock",
// "url(\"paintings/Water-Lilies.jpg\")":"Claude Monet",
"url(\"paintings/Bain-a-la-Grenouillere.jpg\")":"Claude Monet",
"url(\"paintings/the-Raft-of-the-Medusa.jpg\")":"Theodore Gericault"
}

var backgroundColor = "rgb(39, 34, 48)";
var holders = document.querySelectorAll(".holder");
var messageDisplay = document.querySelector("#message");

var easy = document.querySelector("#easy");
var medium = document.querySelector("#medium");
var hard = document.querySelector("#hard");

// var paintingImages = Object.keys(totalPaintings);
// var paintingNames = Object.values(totalPaintings);

var difficultyList = [3,6,9];
Difficulty(difficultyList,holders);
var gameModeList = [totalPaintings,totalPainters];

var gameMode = gameModeList[0]
NewGame(difficultyList[1],gameMode)
// NewGame(difficultyList[1],totalPainters);

// Buttons
// reset Game Button
var resetButton = document.querySelector("#reset");
//toggle paintings and painters BUtton
var toggleButton  = document.querySelector("#TogglePP");

// reset Game
toggleButton.addEventListener("click",function(){
	if(this.classList.contains("images")){
		console.log("images");
		this.classList.remove("images");
		this.classList.add("painters")
		this.textContent = "painters";
		Reset(holders,difficultyList,gameModeList[1]);
	}else if(this.classList.contains("painters")){
		console.log("painters");
		this.classList.remove("painters");
		this.classList.add("images")
		this.textContent = "Paintings";
		Reset(holders,difficultyList,gameModeList[0]);
	}
});

resetButton.addEventListener("click",function(){
	if(toggleButton.classList.contains("images")){
		Reset(holders,difficultyList,gameModeList[0]);
	}else if(toggleButton.classList.contains("painters")){
		Reset(holders,difficultyList,gameModeList[1]);
	}
}
);

function Reset(holders,difficultyList,gameMode){
	// var easy = document.querySelector("#easy");
	// var medium = document.querySelector("#medium");
	// var hard = document.querySelector("#hard");
	CleanHolders(holders);
	messageDisplay.textContent = "Chooce one correct painting";
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



function CleanHolders(hol){
	for (var i = 0; i < 9; i++){
		// delete the painting
		hol[i].style.backgroundSize = "100% 100%";
		hol[i].style.background = backgroundColor ;
	}
	};


function Difficulty(self,holders){
	// var easy = document.querySelector("#easy");
	// var medium = document.querySelector("#medium");
	// var hard = document.querySelector("#hard");

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



function NewGame(difficulty,total){

	if(total===totalPaintings){
		document.querySelector("#Question").textContent = "Which one is named  "
	} else if(total===totalPainters){
		document.querySelector("#Question").textContent = "Which one was painted by  "
	}

	paintingImages = Object.keys(total);
	paintingNames = Object.values(total);

	Names = generatePaintings(difficulty,paintingImages);
	
	paintings = SelectedPaintings(Names);
	// key of painting
	correctPaintingImage = pickPainting(Object.keys(paintings));//value of painying
	// value of painying
	correctPainting = paintings[correctPaintingImage];
	paintingName = document.querySelector("#paintingName");
	paintingName.textContent = correctPainting;
	

	// var holders = document.querySelectorAll(".holder");
	

	// var messageDisplay = document.querySelector("#message");

	loadPaintings(holders,paintings);

	function SelectedPaintings(Names){
		temp=[]
		for (var i = 0; i < Names.length; i++) {
			temp.push([Names[i],total[Names[i]]])
		}
		Object.fromEntries = arr => Object.assign({}, ...Array.from(arr, ([k, v]) => ({[k]: v}) ));
		return Object.fromEntries(temp)
	}

	function loadPaintings(self,obj){
		var tempKeys = Object.keys(obj);
		var tempKeysLength = Object.keys(obj).length;
		// var tempValues = Object.values(obj);
		// loop through all paintingHolders
		for (var i = 0; i < tempKeysLength; i++){
			// sizing paintings
			self[i].style.backgroundSize = "100% 100%";
			// insert paintings
		 	self[i].style.backgroundImage=tempKeys[i];
			// check the answer with the value
			self[i].addEventListener("click",function(){paintingChoice(this,"click")});
		}
			
		
	};
	

	function paintingChoice(self,event){
		// the given answer with the value value
		var clickedPainting = self.style.backgroundImage;
		// check if it is correct
		console.log("click "+clickedPainting);
		console.log("correct"+correctPaintingImage);
		if(clickedPainting==correctPaintingImage){
			messageDisplay.textContent = "Correct!";
			changePainting(correctPaintingImage);
			resetButton.textContent = "Play Again";
		} else{
			self.style.background = backgroundColor ;
			messageDisplay.textContent = "Try again";
		};
	};

	function changePainting(self){
		// loop through all paintingHolders
		for (var i = 0; i < Object.keys(paintings).length; i++){
			// change the painting
			holders[i].style.backgroundSize = "100% 100%";
			holders[i].style.backgroundImage= self;
		}
	};

	function pickPainting(self){
		var rad = Math.floor(Math.random()*self.length);
		return self[rad];
	};

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

