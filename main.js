var fireLevel = 0;
var maxFire = 3;

var boneScrap = 0;
var availiableBoneScrap = 1000;
var cursors = 0; 

//Button functions
function fuelFire(number){
	document.getElementById("fuelFireFeedback").innerHTML = "0"
	increasefireLevel(number)
};
function boneScrapClick(number){
	increaseboneScrap(number)
	document.getElementById("boneScrapClickButton").disabled = true;
	document.getElementById("boneScrapFeedback").innerHTML = "-"

	window.setTimeout(function(){
		document.getElementById("boneScrapClickButton").disabled = false;
		document.getElementById("boneScrapFeedback").innerHTML = "0"
	}, 2000);
};

//Build Functions
function buyCursor(){
    var cursorCost = getCursorCost(cursors);     //works out the cost of this cursor
    if(boneScrap >= cursorCost){                                   //checks that the player can afford the cursor
        cursors = cursors + 1;                                   //increases number of cursors
    	boneScrap = boneScrap - cursorCost;                          //removes the cookies spent
        document.getElementById('cursors').innerHTML = cursors;  //updates the number of cursors for the user
        document.getElementById('boneScrap').innerHTML = boneScrap;  //updates the number of cookies for the user
    };
    var nextCost = getCursorCost(cursors);       //works out the cost of the next cursor
    updateGUI();  //updates the cursor cost for the user
};

function getCursorCost(number){
	return Math.floor(10 * Math.pow(1.1,number));
}


//increase functions
	
function increasefireLevel(number){
		fireLevel = fireLevel + number;
		if (fireLevel >= maxFire){
			fireLevel = maxFire;
		}
		//document.getElementById("fireLevel").innerHTML = fireLevel
		document.getElementById("fuelFireFeedback").innerHTML = fireLevel
}

	
function increaseboneScrap(number){
	
		number = number * fireLevel
		maxboneScrap = availiableBoneScrap - number;
		boneScrap = boneScrap + number;	
		document.getElementById("boneScrap").innerHTML = boneScrap
}
//utility functions
function saveGame(){
	var save = {
		fireLevel: fireLevel,
		maxFire: maxFire,
		boneScrap: boneScrap,
		availiableBoneScrap: availiableBoneScrap,
		cursors: cursors
	}
	
	localStorage.setItem("save",JSON.stringify(save));
}

function loadGame(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	
	if (typeof savegame.fireLevel !== "undefined") fireLevel = savegame.fireLevel;
	if (typeof savegame.maxFire !== "undefined") maxFire = savegame.maxFire;
	if (typeof savegame.boneScrap !== "undefined") boneScrap = savegame.boneScrap;
	if (typeof savegame.availiableBoneScrap !== "undefined") availiableBoneScrap = savegame.availiableBoneScrap;
	if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
	
	updateGUI()
}

function updateGUI(){
	document.getElementById("fuelFireFeedback").innerHTML = fireLevel
	document.getElementById("boneScrap").innerHTML = boneScrap
	document.getElementById('cursors').innerHTML = cursors;
	document.getElementById('cursorCost').innerHTML = getCursorCost(cursors);
}

function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

//game loop
window.setInterval(function(){
	if(fireLevel > 0){
		console.log("Tick")
		increaseboneScrap(cursors); 
		//roll for fire level drop
		if ( Math.random() <= 0.1)
		{
			console.log("Fire level dropped");
			fireLevel = fireLevel - 1;
			document.getElementById("fuelFireFeedback").innerHTML = fireLevel
		}
	}	
}, 1000);