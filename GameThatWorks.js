/*******************************************************/
// P5.play: GameThatWorks
// Make a game that works
// Written by Mio Hoffman
/*******************************************************/

/*******************************************************/
// preload()
/*******************************************************/
	let playerImg;
function preload(){
	console.log("preload");
	playerImg = loadImage("/assets/images/player_run.png");
	cookieImage = loadImage("/assets/images/cookie.png");
}
/*******************************************************/
// setup()
/*******************************************************/

const GAMEWIDTH = 500;
const GAMEHEIGHT = 500;

const playerSize = 40;
const MOVEMENTSPEED = 10;
var player;
var score = 0;

const COOKIESIZE = 10;
const COOKIE_TIMEOUT = 2000;
var cookie;

var gameState = "start";

function setup() {
	console.log("setup: ");
	cnv = new Canvas(GAMEWIDTH, GAMEHEIGHT);

	player = new Sprite(100, 100, playerSize, playerSize, 'd');
    player.color = 'purple';
	player.spriteSheet = playerImg;
	player.anis.offset.x = 2;
	player.anis.frameDelay = 3;

	player.addAnis({
		run: {row: 0, frames: 4}
	});
	player.changeAni('run');

	allSprites.pixelPerfect = true;

	cookies = new Group();

    cookies.add(createCookie());

    player.collides(cookies, getPoint);
    function getPoint(collider1, collider2) {
        collider2.remove();
        score++;
    }
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	player.rotation = 0;
	if (gameState == "play"){
		runGame();
	}
	else if (gameState == "start"){
		startScreen();
	}
	else if (gameState == "lose"){
		loseScreen();
	}
}

function update(){
	clear();
	if (kb.presses('d')) player.changeAni('run');
}

/*******************************************************/
// startScreen()
/*******************************************************/
function startScreen() {
	player.remove();
	cookies.remove();
}

/*******************************************************/
// start()
/*******************************************************/
function start() {
	setup();
	gameState = "play";
	walls();
}

/*******************************************************/
// runGame()
/*******************************************************/
function runGame(){
	background('pink');
	if (random(0, 1000) < 10){
		cookies.add(createCookie());
	}
    movePlayer();
	for (var i = 0; i < cookies.length; i++){
		// Check cookie time, should return true if the cookie is old and needs to be deleted
		if (checkCookieTime(cookies[i])){
			cookies[i].remove();
			gameState = "lose"
		}
	}
	console.log(gameState);
    displayScore();
}

/*******************************************************/
// loseScreen()
/*******************************************************/
function loseScreen(){
	background('red');
	player.remove();
	cookies.remove();
	fill(0, 0, 0);
    textSize(40);
    text("You missed a cookie!", 10, 200);

	text("Score: " + score, 10, 250);
}

/*******************************************************/
// checkcookieTime()
/*******************************************************/
function checkCookieTime(_cookie){
    //Check if the cookie has been around too long (COOKIE_TIMEOUT milliseconds)
    if (_cookie.spawntime + COOKIE_TIMEOUT < millis()){
		return(true); // cookie is old
    }
	return(false); //cookie is young
}

/*****************************************************/
// displayScore()
/*******************************************************/
function displayScore(){
    fill(0, 0, 0);
    textSize(20);
    text("Score: " + score, 10, 30);
}

/*******************************************************/
// createCookie()
/*******************************************************/
function createCookie(){
    var cookie = new Sprite(random(0, GAMEHEIGHT), random(0, GAMEHEIGHT), 40);
    cookie.image = (cookieImage);
	cookie.scale = 2;
    cookie.spawntime = millis();
	return(cookie);
}

/*******************************************************/
// walls()
/*******************************************************/
function walls(){
	wallLH  = new Sprite(0, height/2, 8, height, 's');
	wallRH  = new Sprite(500, height/2, 8, height, 's');
	wallTop = new Sprite(250, 0, width, 8, 's');
	wallBot = new Sprite(250, 500, width, 8, 's');
	wallLH.color = 'black';
	wallRH.color = 'purple';
	wallTop.color = 'red';
	wallBot.color = 'cyan';
}

/*******************************************************/
// movePlayer()
/*******************************************************/
function movePlayer(){
    if (kb.pressing('left')){
		player.vel.x = -MOVEMENTSPEED;
	}
	else if (kb.pressing('right')) {
		player.vel.x = MOVEMENTSPEED;
	}
	else if (kb.pressing('up')) {
		player.vel.y = -MOVEMENTSPEED;
	}
	else if (kb.pressing('down')) {
		player.vel.y = MOVEMENTSPEED;
	}

	if (kb.released('left')) {
		player.vel.x = 0;
	}
	else if (kb.released('right')) {
		player.vel.x = 0;
	}
	else if (kb.released('up')) {
		player.vel.y = 0;
	}
	else if (kb.released('down')){
		player.vel.y = 0;
	}
}