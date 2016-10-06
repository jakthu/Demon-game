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
var gameObjects =
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
*/

//Map code

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
var POISON = 21;
var HS = 22;

var SMITE = 23;
var TAUNT = 24;
var HEAL = 25;
var THORNS = 26;

var RED1 = 27;
var RED2 = 28;

var DUMMYABILITY = 29;

//The size of each tile cell
var SIZE = 64;

//The number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

//The number of columns on the tilesheet
var TILESHEET_COLUMNS = 4;

//Arrays to store the game objects
var sprites = [];
var messages = []; //for hpMessages & other unit info
var units = []; //an array containing the units
var skills = [];

var assetsToLoad = [];
var assetsLoaded = 0;

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/combatantsTilesheet.png";
assetsToLoad.push(image);

//Game states
var LOADING = 0;
var BUILD_MAP = 1;
var PLAYING = 2;
var OVER = 3;
var gameState = LOADING;

canvas.addEventListener("mousedown", mousedownHandler, false);

var moveStatus = 0;
var initialX = 0;
var initialY = 0;
var targetX = 0;
var targetY = 0;
var currentlySelectedUnit;
var actionX = 0;
var actionY = 0;

//---------------------------------skill declarations
var sDummy;
var sFireball;
var sFrostbolt;
var sTele;

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
var RED_HP = 8;
var GRE_HP = 9;

//var UNITINFO_ABILITIES = [];
var EMPTY_ABILITIES = undefined;
var WIZ_ABILITIES = [FIREBALL, FROSTBOLT, CHAINL, TELE];
var WAR_ABILITIES = [RAGE, SLASH, ANNIHILATE, BASH];
var ARC_ABILITIES = [PA, CA, POISON, HS];
var PAL_ABILITIES = [SMITE, TAUNT, HEAL, THORNS];
var RED_ABILITIES = [RED1, RED2, DUMMYABILITY, DUMMYABILITY]; //if a hero is clicked then an enemy is clicked, shows the last 2 abilities of the hero (ex: when wiz then red clicked --> red1, red2, chainl, tele)
var GRE_ABILITIES = [RED1, RED2, DUMMYABILITY, DUMMYABILITY];

//var UNITINFO_TILESHEET = [];
var EMPTY_TILESHEET = undefined;
var WIZ_TILESHEET = 5;
var WAR_TILESHEET = 6;
var ARC_TILESHEET = 7;
var PAL_TILESHEET = 8;
var RED_TILESHEET = 9;
var GRE_TILESHEET = 10;

//* * * * * * * * * *
//* SKILL CONSTANTS *
//* * * * * * * * * *

//DAMAGE
var DUMMY_DAMAGE = undefined;
var FIREBALL_DAMAGE = 2;
var FROSTBOLT_DAMAGE = 1;
var CHAINL_DAMAGE = 1;
var TELE_DAMAGE = 0;
var RAGE_DAMAGE = 1;
var SLASH_DAMAGE = 1;
var ANNIHILATE_DAMAGE = 3;
var BASH_DAMAGE = 1;
var PA_DAMAGE = 1;
var CA_DAMAGE = 1;
var POISON_DAMAGE = 1;
var HS_DAMAGE = 1;
var SMITE_DAMAGE = 2;
var TAUNT_DAMAGE = 0;
var HEAL_DAMAGE = -2;
var THORNS_DAMAGE = 1;

//RANGE
var DUMMY_RANGE = undefined;
var FIREBALL_RANGE = undefined;
var FROSTBOLT_RANGE = undefined;
var CHAINL_RANGE = undefined;
var TELE_RANGE = 2;
var RAGE_RANGE = 3;
var SLASH_RANGE = 1;
var ANNIHILATE_RANGE = 1;
var BASH_RANGE = 1;
var PA_RANGE = undefined;
var CA_RANGE = undefined;
var POISON_RANGE = undefined;
var HS_RANGE = undefined;
var SMITE_RANGE = 1;
var TAUNT_RANGE = undefined;
var HEAL_RANGE = undefined;
var THORNS_RANGE = 1;

//PROC
var DUMMY_PROC = undefined;
var FIREBALL_PROC = undefined;
var FROSTBOLT_PROC = undefined;
var CHAINL_PROC = undefined;
var TELE_PROC = undefined;
var RAGE_PROC = undefined;
var SLASH_PROC = undefined;
var ANNIHILATE_PROC = undefined;
var BASH_PROC = 30;
var PA_PROC = undefined;
var CA_PROC = 40;
var POISON_PROC = undefined;
var HS_PROC = 50;
var SMITE_PROC = 50;
var TAUNT_PROC = undefined;
var HEAL_PROC = undefined;
var THORNS_PROC = undefined;


//DESCRIPTION
var DUMMY_DESCRIPTION = undefined;
var FIREBALL_DESCRIPTION = FIREBALL_DAMAGE + " dmg to single target";
var FROSTBOLT_DESCRIPTION = FROSTBOLT_DAMAGE + " dmg to single target; dmg increases by 1 with each consecutive frostbolt on same target";
var CHAINL_DESCRIPTION = CHAINL_DAMAGE + " dmg to a target and enemies next to that target";
var TELE_DESCRIPTION = "move 2 spaces";
var RAGE_DESCRIPTION = "move 3 spaces this turn; lose " + RAGE_DAMAGE + " HP"
var SLASH_DESCRIPTION = SLASH_DAMAGE + " dmg to enemies in an arc"
var ANNIHILATE_DESCRIPTION = ANNIHILATE_DAMAGE + " dmg to single target";
var BASH_DESCRIPTION = BASH_DAMAGE + " dmg to single target; " + BASH_PROC + "% chance to stun target for 1 turn";
var PA_DESCRIPTION = "deals " + PA_DAMAGE + " dmg to all enemies in a straight line";
var CA_DESCRIPTION = CA_DAMAGE + " dmg to single target; " + CA_PROC + "% chance to prevent target from moving for 1 turn";
var POISON_DESCRIPTION = POISON_DAMAGE + " dmg to a single target each turn for the next 10 turns";
var HS_DESCRIPTION = HS_DAMAGE + " dmg to single target; " + HS_PROC + "% chance to do 4 dmg";
var SMITE_DESCRIPTION = SMITE_DAMAGE + " dmg to single target, " + SMITE_PROC + "% chance to do 1 dmg to nearby targets";
var TAUNT_DESCRIPTION = "forces target to stay come to adjacent square";
var HEAL_DESCRIPTION = "restore " + -HEAL_DAMAGE + " HP to an ally";
var THORNS_DESCRIPTION = THORNS_DAMAGE + " dmg to adjacent enemies the next 7 turns";


var TYPE_ENEMY = 1;
var TYPE_ALLY = 2;

var currentSkill = 0;

function Unit(name, hp, abilities, tilesheetlocation, skillText, id)
{
	this.name = name;
	this.id = id;
	this.hpMax = hp;
	this.hp = hp;
	this.abilities = abilities;
	this.icon = iconFromTilesheet(tilesheetlocation);
	this.xpos = undefined; //xpos and ypos will vary by map and for each instance of a unit (enemy), so there is no point in setting defaults
	this.ypos = undefined;
	this.skillText = skillText;
	
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
	
	Unit.prototype.setHP = function(currentHP)
	{
		this.hp = currentHP;
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
	
	Unit.prototype.getSkillText = function()
	{
		return this.skillText;
	}
	
	Unit.prototype.getID = function()
	{
		return this.id;
	};
}
	
	
function Skill(name, range, damage, proc, targetType, description, effect, tilesheet)	
{
	this.name = name;
	this.range = range;
	this.damage = damage;
	this.targetType = targetType;
	this.description = description;
	this.tilesheet = tilesheet;
	
	Skill.prototype.getName = function()
	{
		return this.name;
	};
	
	Skill.prototype.getRange = function()
	{
		return this.range;
	};
	
	Skill.prototype.getDamage = function()
	{
		return this.damage;
	};
	
	Skill.prototype.getTargetType = function()
	{
		return this.targetType;
	};
	
	Skill.prototype.getDescription = function()
	{
		return this.description;
	};
	
	Skill.prototype.effect = effect; //effect is a function that performs the skill's special effects
	
	Skill.prototype.getTilesheet = function()
	{
		return this.tilesheet;
	}
}

/*
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
*/
	
	//creates a new instance of a unit based on template, assigns id, and adds to units
	//it seems to know where to draw the sprites, probably based on where it is in gameObjects
	//so are the coordinate properites and modifications necessary?
	function addUnit(template)
	{
		switch (template)
		{
		case EMPTY:
			units.push(new Unit(EMPTY_NAME, EMPTY_HP, EMPTY_ABILITIES, EMPTY_TILESHEET, undefined, units.length));
			break;
		case WIZARD:
			units.push(new Unit(WIZ_NAME, WIZ_HP, WIZ_ABILITIES, WIZ_TILESHEET, ["Fireball - 2 dmg to single target", "Frostbolt - 1 dmg to single target; dmg increases by 1 with each consecutive frostbolt on same target", "Chain Lightning - 1 dmg to a target and enemies next to that target", "Teleport - move 2 spaces"], units.length));
			break;
		case WARLORD:
			units.push(new Unit(WAR_NAME, WAR_HP, WAR_ABILITIES, WAR_TILESHEET, ["Rage - move 3 spaces this turn; lose 1 HP", "Slash - 1 dmg to enemies in an arc", "Annihilate - 3 dmg to single target", "Bash - 1 dmg to single target; 30% chance to stun target for 1 turn"], units.length));
			break;
		case ARCHER:
			units.push(new Unit(ARC_NAME, ARC_HP, ARC_ABILITIES, ARC_TILESHEET, ["Piercing Arrow - deals 1 dmg to all enemies in a straight line", "Crippling Arrow - 1 dmg to single target; 40% chance to prevent target from moving for 1 turn", "Head Shot - 1 dmg to single target; 50% chance to do 4 dmg", "Poison Arrow - 1 dmg to a single target each turn for the next 10 turns"], units.length));
			break;
		case PALADIN:
			units.push(new Unit(PAL_NAME, PAL_HP, PAL_ABILITIES, PAL_TILESHEET, ["Smite - 2 dmg to single target, 50% chance to do 1 dmg to nearby targets", "Taunt - forces target to stay come to adjacent square", "Heal - restore 2 HP to an ally", "Thorns - 1 dmg to adjacent enemies the next 7 turns"], units.length));
			break;
		case RED:
			units.push(new Unit(RED_NAME, RED_HP, RED_ABILITIES, RED_TILESHEET, ["Fireball", "Frostbolt", "Chain Lightning", "Teleport"], units.length));
			break;
		case GREY:
			units.push(new Unit(GRE_NAME, GRE_HP, GRE_ABILITIES, GRE_TILESHEET, ["Fireball", "Frostbolt", "Chain Lightning", "Teleport"], units.length));
			break;
		}
	}
	
	sDummy = new Skill("Dummy", undefined, undefined, undefined, "dummy skill");
	sFireball = new Skill("Fireball", FIREBALL_RANGE, FIREBALL_DAMAGE, FIREBALL_PROC, TYPE_ENEMY, FIREBALL_DESCRIPTION, FIREBALL);
	sFrostbolt = new Skill("Frostbolt", undefined, undefined, undefined, "dummy skill");
	sDummy = new Skill("Dummy", undefined, undefined, undefined, "dummy skill");
	sDummy = new Skill("Dummy", undefined, undefined, undefined, "dummy skill");
	
	/*
	function castSkill(use)
	{
		switch (use)
		{
		case FIREBALL:
			console.log("fireball cast ran");
			skills.push(new Skill("Fireball", 3, FIREBALL_DAMAGE, TYPE_ENEMY));
			break;
		}
	}
	*/
	
	/*
	function distance () //finds distance between the selected unit and the tile you click on when a skill is selected
	{
		//return Math.abs(initialX - actionX) + Math.abs(initialY - actionY);
	}
	*/
	
	addUnit(EMPTY); //id = 0
	addUnit(WIZARD); //id = 1
	addUnit(WARLORD); //id = 2
	addUnit(ARCHER); //id = 3
	addUnit(PALADIN); //id = 4
	addUnit(RED); //id = 5
	addUnit(RED); //id = 6
	addUnit(GREY); //id = 7
	addUnit(GREY); //id = 8
	console.log(units[4].getAbilities());
	
	//castSkill(FIREBALL); //id =11

function initialClick(event, x, y, occupant) //clicking on row 13 gives TypeError: gameObjects[initialY] is undefined
{
	initialX = x;
	initialY = y;
	
	console.log("Initial click - " + x + "," + y + " - " + occupant.getName() + "(" + occupant.getID() + ")");

	for(i = 0; i < 4; i++)
		map[11][i+1] = EMPTY;
	
	if(occupant.getID() != 0)
		for(i = 0; i < occupant.getAbilities().length; i++)
			map[11][i + 1] = occupant.getAbilities()[i];
		
	hpMessage.text = occupant.getName() + ": " + occupant.getHP() + "/" + occupant.getHPMax() + "hp";
    messages.push(hpMessage);
  
	//clears skill text if another unit or grid is clicked
	skillMessage.text = "";
	messages.push(skillMessage);
	
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
	targetX = x;
	targetY = y;
	
	console.log("Target  click - " + x + "," + y + " - " + occupant.getName() + "(" + occupant.getID() + ")");
	
	if(((targetX === initialX && targetY - initialY === -1) || //up 
		(targetX === initialX && targetY - initialY === 1) //down
		|| (targetX - initialX === -1 && targetY === initialY) //left
		|| (targetX - initialX === 1 && targetY === initialY)) //right 
		//&& (gameObjects[targetY][targetX] < 5 || gameObjects[targetY][targetX] > 8)
		) 
	{
		gameObjects[targetY][targetX] = gameObjects[initialY][initialX];
		gameObjects[initialY][initialX] = 0;
		moveStatus = 0;
		buildMap(map);
		buildUnitMap();//buildMap(gameObjects);
		
	}
}

function abilityClick(event, x)
{
	console.log("ability clicked");
	
	var currentSkill = currentlySelectedUnit.getAbilities()[x-1]; //this is an int
	
	console.log(currentSkill);
	//console.log(currentlySelectedUnit.getAbilities()[x-1]);
	console.log(currentlySelectedUnit.getSkillText()[x-1]);

	skillMessage.text = currentSkill.getDescription(); //currentlySelectedUnit.getSkillText()[x-1];
	messages.push(skillMessage);
	moveStatus = 2;
	currentSkill = currentlySelectedUnit.getAbilities()[x-1] - FIREBALL;
}

function actionClick(event, x, y, occupant)
{
	console.log("action clicked");
	moveStatus = 0;
	actionX = x;
	actionY = y;
	if ((gameObjects[y][x]>=5 && gameObjects[y][x] <=8) && skills[currentSkill].getTargetType() === TYPE_ENEMY)
	{
		console.log("ssss");

		//decrease enemy HP by damage of skill
		occupant.setHP(occupant.getHP()-skills[currentSkill].getDamage());
	}
	
}

//handles mouse clicks
function mousedownHandler(event) 
{
	var x = Math.floor((event.pageX - canvas.offsetLeft)/64);
	var y = Math.floor((event.pageY - canvas.offsetTop)/64);
	var occupant = units[gameObjects[y][x]];
	console.log("occupant: " + occupant);
	
	if(y === 11 && x > 0 && x < 5)
	{
		abilityClick(event, x);
	}
	else
	{
		
		if(moveStatus === 0 || (gameObjects[y][x] > 0 && gameObjects[y][x] <=4))
		{
			currentlySelectedUnit = occupant;
			initialClick(event, x, y, occupant);
		}
		else if(moveStatus === 1)
		{
			targetClick(event, x, y, occupant);
		}
		else if(moveStatus === 2)
		{
			actionClick(event, x, y, occupant);
		}
		/* else if(moveStatus ===3 && (skillRange)
		{
			moveStatus = 1;
		} */
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
				var currentUnit = units[gameObjects[row][column]];
				var currentIcon = currentUnit.getIcon();
				currentIcon.x = column * SIZE; //currentUnit.getX();
				currentIcon.y = row * SIZE; //currentUnit.getY();
				sprites.push(currentIcon);
			}
		}
	}
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
	hpMessage = Object.create(messageObject);
	hpMessage.x = 11;
	hpMessage.y = 660;
	hpMessage.font = "bold 40px Helvetica";
	hpMessage.fillStyle = "black";
	hpMessage.text = "";
	
	skillMessage = Object.create(messageObject);
	skillMessage.x = 40;
	skillMessage.y = 800;
	skillMessage.font = "12px Helvetica";
	skillMessage.fillStyle = "black";
	skillMessage.text = "";
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