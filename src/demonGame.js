(function(){
	
	console.log("- - - - - - - - start - - - - - - - -"); //////////////////////////////////

//The canvas
var canvas = document.querySelector("canvas"); 
var drawingSurface = canvas.getContext("2d");

//The game map
var map = 
[
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0], //this line will have all 0's, will print unit's name
  [0,0,0,0,0,0,0,0,0,0,0],	//this line has values for HP and 4 skill boxes
  [0,0,0,0,0,0,0,0,0,0,0]	//this line has all 0's, prints skill description
];

//The game objects map
var gameObjects =/*
[
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [5,6,0,0,0,0,0,0,0,9,10],
  [7,8,0,0,0,0,0,0,0,9,10],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  		//these bottom 3 lines for the info of characters
	  [0,0,0,0,0,0,0,0,0,0,0], //this line will have all 0's, will print unit's name
	  [0,0,0,0,0,0,0,0,0,0,0],	//this line has values for HP and 4 skill boxes
	  [0,0,0,0,0,0,0,0,0,0,0]	//this line has all 0's, prints skill description
];*/
[ 
  [0,0,0,0,0,0,0,0,0,0,0], //gameObjects holds the ids of each unit
  [0,0,0,0,0,0,0,0,0,0,0], //it is technically possible for an id to be listed multiple times, 
  [0,0,0,0,0,0,0,0,0,0,0], //resulting in a single unit being in multiple locations (like 0 for empty)
  [0,0,0,0,0,0,0,0,0,0,0],
  [1,2,0,0,0,0,0,0,0,5,7],
  [3,4,0,0,0,0,0,0,0,6,8],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  		//these bottom 3 lines for the info of characters
	  [0,0,0,0,0,0,0,0,0,0,0], //this line will have all 0's, will print unit's name
	  [0,0,0,0,0,0,0,0,0,0,0],	//this line has values for HP and 4 skill boxes
	  [0,0,0,0,0,0,0,0,0,0,0]	//this line has all 0's, prints skill description
];

/*
var charInfo =

  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
		//these bottom 3 lines for the info of characters
	  [0,0,0,0,0,0,0,0,0,0,0], //this line will have all 0's, will print unit's name
	  [0,0,0,0,0,0,0,0,0,0,0],	//this line has values for HP and 4 skill boxes
	  [0,0,0,0,0,0,0,0,0,0,0]	//this line has all 0's, prints skill description
/*
//Map code

var BOX = 2;
var WALL = 3;
var ALIEN = 4;
var BOMB = 5; */

var EMPTY = 0;
var FLOOR = 1;
var TILE = 2;
var AL = 3;
var BALL = 4;
var WIZARD = 5;
var WARLORD = 6;
var ARCHER = 7;
var PALADIN = 8;
var RED = 9;
var GREY = 10;

var FIREBALL = 11; //pic for 1st wizard skill
var FROSTBOLT = 12; //pic for 2nd wiz skill
var CHAINL = 13;
var TELE = 14;

var RAGE = 15;
var SLASH = 16;
var ANNIHILATE = 17;
var BASH = 18;

var PA = 19;
var CA = 20;
var HS = 21;
var POISON = 22;

var SMITE = 23;
var TAUNT = 24;
var HEAL = 25;
var THORNS = 26;

//etc for other 2 skills and all 4 for each other unit.....
//WAR_INFO = ;
//ARC_INFO = ;
//PAL_INFO = ;
//RED1_INFO = ;
//RED2_INFO = ;
//GREY1_INFO = ;
//GREY2_INFO = ;




//The size of each tile cell
var SIZE = 64;

//The number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

//The number of columns on the tilesheet
var TILESHEET_COLUMNS = 4;

//Sprites we need to access by name
var alien = null;
var timeDisplay = null;
var gameOverDisplay = null;
var gameOverMessage = null;
var timerMessage = null;

//Arrays to store the game objects
var sprites = [];
var messages = []; //for hpMessages & other unit info
var boxes = [];
var bombs = [];

var assetsToLoad = [];
var assetsLoaded = 0;

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/combatantsTilesheet.png";
assetsToLoad.push(image);

/* //Game variables
var bombsDefused = 0;

//The game timer
gameTimer.time = 20;
gameTimer.start(); */

//var hpAmount = 10;



//Game states
var LOADING = 0;
var BUILD_MAP = 1;
var PLAYING = 2;
var OVER = 3;
var gameState = LOADING;

/* //Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37; */

//Directions
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;

canvas.addEventListener("mousedown", mousedownHandler, false);

var moveStatus = 0;
var initialX = 0;
var initialY = 0;
var targetX = 0;
var targetY = 0;

//* * * * * * * * * * * *
//* UNIT INFO CONSTANTS *
//* * * * * * * * * * * *

//var UNITINFO_NAME = [];
var EMPTY_NAME = "Empty";
var WIZ_NAME = "Wizard";
var WAR_NAME = "Warlord";
var ARC_NAME = "Archer";
var PAL_NAME = "Paladin";
var RED_NAME = "Red";
var GRE_NAME = "Grey";

//var UNITINFO_HP = [];
var EMPTY_HP = undefined;
var WIZ_HP = 5;
var WAR_HP = 6;
var ARC_HP = 7;
var PAL_HP = 8;
var RED_HP = undefined;
var GRE_HP = undefined;

//var UNITINFO_ABILITIES = [];
var EMPTY_ABILITIES = undefined;
var WIZ_ABILITIES = [FIREBALL, FROSTBOLT, CHAINL, TELE];
var WAR_ABILITIES = [RAGE, SLASH, ANNIHILATE, BASH];
var ARC_ABILITIES = [PA, CA, POISON, HS];
var PAL_ABILITIES = [SMITE, TAUNT, HEAL, THORNS];
var RED_ABILITIES = [];
var GRE_ABILITIES = [];

//var UNITINFO_TILESHEET = [];
var EMPTY_TILESHEET = undefined;
var WIZ_TILESHEET = 5;
var WAR_TILESHEET = 6;
var ARC_TILESHEET = 7;
var PAL_TILESHEET = 8;
var RED_TILESHEET = 9;
var GRE_TILESHEET = 10;

function Unit(name, id, hp, abilities, tilesheetlocation)
{
	this.name = name;
	this.id = id;
	this.hpMax = hp;
	this.hp = hp;
	this.abilities = abilities;
	this.icon = iconFromTilesheet(tilesheetlocation);/*Object.create(spriteObject);
    this.icon.sourceX = Math.floor((tilesheetlocation - 1) % TILESHEET_COLUMNS) * SIZE;
    this.icon.sourceY = Math.floor((tilesheetlocation - 1) / TILESHEET_COLUMNS) * SIZE;*/
    //this.icon.x = column * SIZE; //the location of the icon needs to change whenever the unit is moved !!!!!the icon position only needs to be changed when the icon is being drawn
    //this.icon.y = row * SIZE;
            //sprites.push(object);
	this.xpos = undefined;
	this.ypos = undefined;
	
	//Object.prototype is a property
	Unit.prototype.toString = function unitCustomToString() //overwrites the toString
	{
		return this.id + " - " + this.name;
	};
	
	Unit.prototype.getName = function()
	{
		return this.name;
	};
	
	Unit.prototype.getHPMax = function()
	{
		return this.hpMax;
	};
	
	Unit.prototype.getHP = function() 
	{
		return this.hp;
	};

	Unit.prototype.getIcon = function()
	{
		this.icon.x = this.xpos;
		this.icon.y = this.ypos;
		return this.icon;
	};

	Unit.prototype.getX = function()
	{
		return this.xpos;
	};

	Unit.prototype.getY = function()
	{
		return this.ypos;
	};
	
	Unit.prototype.setPos = function(newX, newY)
	{
		this.xpos = newX;
		this.ypos = newY;
	}

	Unit.prototype.getAbilities = function()
	{
		return this.abilities;
	};
	
	Unit.prototype.getID = function()
	{
		return this.id;
	};
}
	
function Sprite() //not used, just an experiment
{
  this.sourceX = 0,
  this.sourceY = 0,
  this.sourceWidth = 64,
  this.sourceHeight = 64,
  this.width = 64,
  this.height = 64,
  this.x = 0,
  this.y = 0,
  this.vx = 0,
  this.vy = 0,
  this.visible = true,
  
  //Getters
  Sprite.prototype.centerX = function()
  {
    return this.x + (this.width / 2);
  };
  
  Sprite.prototype.centerY = function()
  {
    return this.y + (this.height / 2);
  };
  
  Sprite.prototype.halfWidth = function()
  {
    return this.width / 2;
  };
  
  Sprite.prototype.halfHeight = function()
  {
    return this.height / 2;
  };
}

	var units = []; //an array containing the units
	
	/*
	function addUnit(name, hp, abilities, tilesheetlocation, xpos, ypos)
	{
		//console.log("Name: " + name + " X: " + xpos + " Y: " + ypos);
		units.push(new Unit(hp, abilities, tilesheetlocation, xpos, ypos, units.length, name));
	}
	*/
	
	//creates a new unit based on template, assigns id, and adds to units
	//it seems to know where to draw the sprites, probably based on where it is in gameObjects
	//so are the coordinate properites and modifications necessary?
	function addUnit(template)
	{
		switch (template)
		{
		case EMPTY:
			units.push(new Unit(EMPTY_NAME, units.length, EMPTY_HP, EMPTY_ABILITIES, EMPTY_TILESHEET));
			break;
		case WIZARD:
			units.push(new Unit(WIZ_NAME, units.length, WIZ_HP, WIZ_ABILITIES, WIZ_TILESHEET)); //xpos and ypos will vary by map and for each instance of a unit (enemy)
			break;
		case WARLORD:
			units.push(new Unit(WAR_NAME, units.length, WAR_HP, WAR_ABILITIES, WAR_TILESHEET));
			break;
		case ARCHER:
			units.push(new Unit(ARC_NAME, units.length, ARC_HP, ARC_ABILITIES, ARC_TILESHEET));
			break;
		case PALADIN:
			units.push(new Unit(PAL_NAME, units.length, PAL_HP, PAL_ABILITIES, PAL_TILESHEET));
			break;
		case RED:
			units.push(new Unit(RED_NAME, units.length, RED_HP, RED_ABILITIES, RED_TILESHEET));
			break;
		case GREY:
			units.push(new Unit(GRE_NAME, units.length, GRE_HP, GRE_ABILITIES, GRE_TILESHEET));
			break;
		}
	}
	
	//var dummyEmpty = new Unit(undefined, undefined, undefined, undefined, undefined, 0, "Empty"); //a dummy unit with id 0
	//addUnit(dummyEmpty); 
	addUnit(EMPTY); //id = 0
	addUnit(WIZARD); //id = 1
	addUnit(WARLORD); //id = 2
	addUnit(ARCHER); //id = 3
	addUnit(PALADIN); //id = 4
	addUnit(RED); //id = 5
	addUnit(RED); //id = 6
	addUnit(GREY); //id = 7
	addUnit(GREY); //id = 8
	//units[1].setPos(0,4);
	/*
	addUnit("Wizard", WIZ_HP, WIZ_ABILITIES, 5, 0, 4);
	addUnit("Warlord", 6, WAR_HP, 6, 1, 4);
	addUnit("Archer", 7, ARC_ABILITIES, 7, 0, 5);
	addUnit("Paladin", 8, PAL_ABILITIES, 8, 1, 5);
	*/
	
	/*
	var wIZARD = new Unit(5, {FIREBALL, FROSTBOLT, CHAINL, TELE}, 5, 0, 4, 1, "Wizard");
	units.push(wIZARD);
	var wARLORD = new Unit(5, {FIREBALL, FROSTBOLT, CHAINL, TELE}, 6, 1, 4, 2, "Warlord");
	units.push(wARLORD);
	var aRCHER = new Unit(5, {FIREBALL, FROSTBOLT, CHAINL, TELE}, 7, 0, 5, 3, "Archer");
	units.push(aRCHER);
	var pALADIN = new Unit(5, {FIREBALL, FROSTBOLT, CHAINL, TELE}, 8, 1, 5, 4, "Paladin");
	units.push(pALADIN);
	*/
	//console.log(wIZARD.getHP());
	
	//var tester = new test();
	//console.log(tester.string);
	//console.log("hello " + units[0].string);
	//console.log("HP " + wARLORD.hp);
	//console.log("length" + units.push());



function initialClick(event, x, y, occupant) //clicking on row 13 gives TypeError: gameObjects[initialY] is undefined
{
	initialX = x; //Math.floor((event.pageX - canvas.offsetLeft)/64);
	initialY = y; //Math.floor((event.pageY - canvas.offsetTop)/64);
	
	//var occupant = units[gameObjects[initialY][initialX]];
	
	console.log("Initial click - " + x + "," + y + " - " + occupant.getName());

	//console.log(initialY);
	
	if(occupant.getID() != 0)
	{
		//console.log("display abilities for " + occupant.getName());
		map[11][1] = occupant.getAbilities()[0];
		map[11][2] = occupant.getAbilities()[1];
		map[11][3] = occupant.getAbilities()[2];
		map[11][4] = occupant.getAbilities()[3];
		hpMessage.text = occupant.getName() + ": " + occupant.getHP() + "/" + occupant.getHPMax() + "hp";
	}
/* 	switch(gameObjects[initialY][initialX])
	{
    case WIZARD:
      map[11][1] = FIREBALL;
	  map[11][2] = FROSTBOLT;
	  map[11][3] = CHAINL;
	  map[11][4] = TELE;
	  hpMessage.text = "Wizard: " + wizardHP + " HP";
	  //hpMessage.push('44');
      break;
	case WARLORD:
      map[11][1] = RAGE;
	  map[11][2] = SLASH;
	  map[11][3] = ANNIHILATE;
	  map[11][4] = BASH;
	  hpMessage.text = "Warlord: " + warlordHP + " HP";
      break;
	case ARCHER:
      map[11][1] = PA;
	  map[11][2] = CA;
	  map[11][3] = HS;
	  map[11][4] = POISON;
	  hpMessage.text = "Archer: " + archerHP + " HP";
      break;
	case PALADIN:
      map[11][1] = SMITE;
	  map[11][2] = TAUNT;
	  map[11][3] = HEAL;
	  map[11][4] = THORNS;
	  hpMessage.text = "Paladin: " + paladinHP + " HP";
      break; 
	 
  }*/
	
    messages.push(hpMessage);
  
	buildMap(map);
	buildUnitMap();//buildMap(gameObjects);
	buildAbilityMap();
	
	if(gameObjects[initialY][initialX] > 0 && gameObjects[initialY][initialX] <= 4 )
	{
		moveStatus = 1;

	}
	
}
function targetClick(event, x, y, occupant)
{	
	targetX = x; //Math.floor((event.pageX - canvas.offsetLeft)/64);
	targetY = y; //Math.floor((event.pageY - canvas.offsetTop)/64);
	
	//var occupant = units[gameObjects[initialY][initialX]];
	
	console.log("Target  click - " + x + "," + y + " - " + occupant.getName());
	
	if(((targetX === initialX && targetY - initialY === -1) || //up 
		(targetX === initialX && targetY - initialY === 1) //down
		|| (targetX - initialX === -1 && targetY === initialY) //left
		|| (targetX - initialX === 1 && targetY === initialY)) //right 
		&& (gameObjects[targetY][targetX] < 5 || gameObjects[targetY][targetX] > 8)
		) 
		{
			//console.log("OI");
			gameObjects[targetY][targetX] = gameObjects[initialY][initialX];
			gameObjects[initialY][initialX] = 0;
			moveStatus = 0;
			buildMap(map);
			buildUnitMap();//buildMap(gameObjects);
			
		}
}

function mousedownHandler(event) 
{
	var x = Math.floor((event.pageX - canvas.offsetLeft)/64);
	var y = Math.floor((event.pageY - canvas.offsetTop)/64);
	var occupant = units[gameObjects[y][x]];

	if(moveStatus === 0 || (gameObjects[y][x] > 0 && gameObjects[y][x] <=4))
	{
		initialClick(event, x, y, occupant);
	
	}
	else if(moveStatus === 1)
	{
		targetClick(event, x, y, occupant);
	}
}

update(); //this begins the game

function update()
{ 
	//The animation loop
	requestAnimationFrame(update, canvas);
  
	//Change what the game is doing based on the game state
	switch(gameState)
	{
		case LOADING:
		//console.log("loading...");
		break;
      
    case BUILD_MAP:
		buildMap(map);
		buildUnitMap();//buildMap(gameObjects);
		createOtherObjects();
		gameState = PLAYING;
		break;
    
    case PLAYING:
		//playGame();
		break;
    
    case OVER:
		//endGame();
		break;
	}
  
	//Render the game
	render();
}

function loadHandler()
{ 
	assetsLoaded++;
	if(assetsLoaded === assetsToLoad.length)
	{
		//Remove the load handler
		image.removeEventListener("load", loadHandler, false);
        
		//Build the level 
		gameState = BUILD_MAP;
	}
}

function iconFromTilesheet(index/*, xpos, ypos*/)
{
	var icon = Object.create(spriteObject);
	icon.sourceX = Math.floor((index - 1) % TILESHEET_COLUMNS) * SIZE; //the icon's location on the tilesheet
	icon.sourceY = Math.floor((index - 1) / TILESHEET_COLUMNS) * SIZE;
    //icon.x = xpos * SIZE; //the icon's location in the gui
    //icon.y = ypos * SIZE;
	//console.log(icon.visible);
    return icon;
}

function reloadSprites() //unused atm
{
	sprites = [];
}

function buildMap(levelMap) //!!! sprites is constantly added to, so it becomes very large and contains redundant sprites
{
	//sprites = [];
	//console.log("sprites" + sprites.length);
	for(var row = 0; row < ROWS; row++) 
	{	
		for(var column = 0; column < COLUMNS; column++) 
		{ 

			var currentTile = levelMap[row][column];
    
			if(currentTile !== EMPTY)
			{
				/*
				//Find the tile's x and y position on the tile sheet
				var tilesheetX = Math.floor((currentTile - 1) % TILESHEET_COLUMNS) * SIZE; 
				var tilesheetY = Math.floor((currentTile - 1) / TILESHEET_COLUMNS) * SIZE;
        
				var object = Object.create(spriteObject);
			
				object.sourceX = tilesheetX;
				object.sourceY = tilesheetY;
				object.x = column * SIZE;
				object.y = row * SIZE;
				sprites.push(object);
				*/
				var currentIcon = iconFromTilesheet(currentTile);
				currentIcon.x = column * SIZE;
				currentIcon.y = row * SIZE;
				sprites.push(currentIcon);
			}
		}
	}
}

function buildUnitMap()
{
	for(var row = 0; row < ROWS; row++) 
	{	
		for(var column = 0; column < COLUMNS; column++) 
		{ 
			if(gameObjects[row][column] != 0)
			{
				//console.log()
				//console.log(row);
				//console.log(column);
				//console.log(units[0].string);
				//console.log(units[gameObjects[row][column]].string);
				var currentUnit = units[gameObjects[row][column]];
				//console.log("Now drawing " + currentUnit.getName());
				var currentIcon = currentUnit.getIcon();
				//console.log("icon " + currentIcon);
				currentIcon.x = column * SIZE; //currentUnit.getX();
				currentIcon.y = row * SIZE; //currentUnit.getY();
				sprites.push(currentIcon);
			}
		}
	}
	//console.log(sprites);
}


function buildAbilityMap()
{
	for(var counter = 1; counter < 5; counter++)
	{
		sprites.push(units[map[11][counter]]);
	}
}


function createOtherObjects()
{
	 /*  
	 timeDisplay = Object.create(spriteObject);
	  timeDisplay.sourceX = 0;
	  timeDisplay.sourceY = 64;
	  timeDisplay.sourceWidth = 128;
	  timeDisplay.sourceHeight = 48;
	  timeDisplay.width = 128;  
	  timeDisplay.height = 48;            
	  timeDisplay.x = canvas.width / 2 - timeDisplay.width / 2;
	  timeDisplay.y = 8;
	  sprites.push(timeDisplay); 
	  */
	  
	/*   
	gameOverDisplay = Object.create(spriteObject);
	  gameOverDisplay.sourceX = 0;
	  gameOverDisplay.sourceY = 129;
	  gameOverDisplay.sourceWidth = 316;
	  gameOverDisplay.sourceHeight = 290;
	  gameOverDisplay.width = 316;  
	  gameOverDisplay.height = 290;            
	  gameOverDisplay.x = canvas.width / 2 - gameOverDisplay.width / 2;
	  gameOverDisplay.y = canvas.height / 2 - gameOverDisplay.height / 2;
	  gameOverDisplay.visible = false;
	  sprites.push(gameOverDisplay);
	  
	  gameOverMessage = Object.create(messageObject);
	  gameOverMessage.x = 275;
	  gameOverMessage.y = 270;
	  gameOverMessage.font = "bold 30px Helvetica";
	  gameOverMessage.fillStyle = "black";
	  gameOverMessage.text = "";
	  gameOverMessage.visible = false;
	  messages.push(gameOverMessage); 
	  */
	  
	/*   
	timerMessage = Object.create(messageObject);
	  timerMessage.x = 330;
	  timerMessage.y = 10;
	  timerMessage.font = "bold 40px Helvetica";
	  timerMessage.fillStyle = "white";
	  timerMessage.text = "";
	  messages.push(timerMessage); 
	  */
	  
	hpMessage = Object.create(messageObject);
	hpMessage.x = 11;
	hpMessage.y = 660;
	hpMessage.font = "bold 40px Helvetica";
	hpMessage.fillStyle = "black";
	hpMessage.text = "";
}


  //Display the HP
//hpMessage.text = currentHP;
  
function playGame()
{ 
  
}

function endGame()
{
  
}

function render()
{ 
	//console.log("rendering");
	//console.log(sprites);
	drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  
	//Display the sprites
	if(sprites.length !== 0)
	{
		for(var i = 0; i < sprites.length; i++)
		{
			var sprite = sprites[i];
			//console.log(sprite === undefined);
			if(sprite !== undefined && sprite.visible) //is a sprite ever not visible?
			{
				drawingSurface.drawImage
				(
					image, 
					sprite.sourceX, sprite.sourceY, 
					sprite.sourceWidth, sprite.sourceHeight,
					Math.floor(sprite.x), Math.floor(sprite.y), 
					sprite.width, sprite.height
				); 
			}
		}
	}
  
	//sprites = []; //!!!!!!!!!!!!!!!!!!!! empties sprites after they are drawn -- they need to be re-added
  
	//Display the game messages
	if(messages.length !== 0)
	{
		for(var i = 0; i < messages.length; i++)
		{
			var message = messages[i];
			if(message.visible)
			{
				drawingSurface.font = message.font;  
				drawingSurface.fillStyle = message.fillStyle;
				drawingSurface.textBaseline = message.textBaseline;
				drawingSurface.fillText(message.text, message.x, message.y);  
			}
		}
	}
}

}());
