(function(){

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
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [1,2,0,0,0,0,0,0,0,0,0],
  [3,4,0,0,0,0,0,0,0,0,0],
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
var tilesheetColumns = 4;

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


var wizardHP = 5;
var warlordHP = 6;
var archerHP = 7;
var paladinHP = 8;

function Unit(hp, inabilities, tilesheetlocation, inid)
{
	var HP = hp;
	var abilities = inabilities;
	var icon = Object.create(spriteObject);
			
            icon.sourceX = Math.floor((tilesheetlocation - 1) % tilesheetColumns) * SIZE;
            icon.sourceY = Math.floor((tilesheetlocation - 1) / tilesheetColumns) * SIZE;
            //icon.x = column * SIZE;
            //icon.y = row * SIZE;
            //sprites.push(object);
	var id = inid;
}


	var units = [];
	var wIZARD = new Unit(5, {FIREBALL, FROSTBOLT, CHAINL, TELE}, 5, 1);
	units.push(wIZARD);
	var wARLORD = Unit(5, {FIREBALL, FROSTBOLT, CHAINL, TELE}, 5, 2);
	units.push(wARLORD);
	var aRCHER = Unit(5, {FIREBALL, FROSTBOLT, CHAINL, TELE}, 5, 3);
	units.push(aRCHER);
	var pALADIN = Unit(5, {FIREBALL, FROSTBOLT, CHAINL, TELE}, 5, 4);
	units.push(pALADIN);



function initialClick(event)
{
	console.log("Initial click");
	Test();
	
	initialX = Math.floor((event.pageX - canvas.offsetLeft)/64);
	initialY = Math.floor((event.pageY - canvas.offsetTop)/64);
	
	console.log(initialX);
	console.log(initialY);
	
	//var id = gameObjects[y][x];
	//map[11][1] = unitarray[id].abilities[1];
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
	
	if(gameObjects[initialY][initialX] >= 5 && gameObjects[initialY][initialX] <= 8 )
	{
		moveStatus = 1;

	}
	
}
function targetClick(event)
{
	console.log("Target click");
	targetX = Math.floor((event.pageX - canvas.offsetLeft)/64);
	targetY = Math.floor((event.pageY - canvas.offsetTop)/64);

	console.log(targetX);
	console.log(targetY);
	
	if(((targetX === initialX && targetY - initialY === -1) || //up 
		(targetX === initialX && targetY - initialY === 1) //down
		|| (targetX - initialX === -1 && targetY === initialY) //left
		|| (targetX - initialX === 1 && targetY === initialY)) //right 
		&& (gameObjects[targetY][targetX] < 5 || gameObjects[targetY][targetX] > 8)
		) 
		{
			console.log("OI");
			gameObjects[targetY][targetX] = gameObjects[initialY][initialX];
			gameObjects[initialY][initialX] = 0;
			moveStatus = 0;
			buildMap(map);
			buildUnitMap();//buildMap(gameObjects);
			
		}
}

function mousedownHandler(event)
{
	x = Math.floor((event.pageX - canvas.offsetLeft)/64);
	y = Math.floor((event.pageY - canvas.offsetTop)/64);
	if(moveStatus === 0 || (gameObjects[y][x] >= 5 && gameObjects[y][x] <=8))
	{
		initialClick(event);
	
	}
	else if(moveStatus === 1)
	{
		targetClick(event);
	}
}



update();

function update()
{ 
  //The animation loop
  requestAnimationFrame(update, canvas);
  
  //Change what the game is doing based on the game state
  switch(gameState)
  {
    case LOADING:
      console.log("loading...");
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

function buildMap(levelMap)
{
  for(var row = 0; row < ROWS; row++) 
  {	
    for(var column = 0; column < COLUMNS; column++) 
    { 

      var currentTile = levelMap[row][column];
    
      if(currentTile !== EMPTY)
      {
        //Find the tile's x and y position on the tile sheet
        var tilesheetX = Math.floor((currentTile - 1) % tilesheetColumns) * SIZE; 
        var tilesheetY = Math.floor((currentTile - 1) / tilesheetColumns) * SIZE;
        
		var object = Object.create(spriteObject);
			
            object.sourceX = tilesheetX;
            object.sourceY = tilesheetY;
            object.x = column * SIZE;
            object.y = row * SIZE;
            sprites.push(object);
		
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
			console.log(row);
			console.log(column);
			console.log(gameObjects[row][column]);
			sprites.push(units[gameObjects[row][column]-1].icon);
		}
	}
  }
}

function createOtherObjects()
{
 /*  timeDisplay = Object.create(spriteObject);
  timeDisplay.sourceX = 0;
  timeDisplay.sourceY = 64;
  timeDisplay.sourceWidth = 128;
  timeDisplay.sourceHeight = 48;
  timeDisplay.width = 128;  
  timeDisplay.height = 48;            
  timeDisplay.x = canvas.width / 2 - timeDisplay.width / 2;
  timeDisplay.y = 8;
  sprites.push(timeDisplay); */
  
/*   gameOverDisplay = Object.create(spriteObject);
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
  messages.push(gameOverMessage); */
  
/*   timerMessage = Object.create(messageObject);
  timerMessage.x = 330;
  timerMessage.y = 10;
  timerMessage.font = "bold 40px Helvetica";
  timerMessage.fillStyle = "white";
  timerMessage.text = "";
  messages.push(timerMessage); */
  
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
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  
  //Display the sprites
  if(sprites.length !== 0)
  {
    for(var i = 0; i < sprites.length; i++)
	{
	  var sprite = sprites[i];
	  if(sprite.visible)
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
