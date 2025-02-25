/*******************************************************/
// P5.play: GameThatWorks
// Make a game that works
// Written by Mio Hoffman
/*******************************************************/

/*******************************************************/
// setup()
/*******************************************************/

const GAMEWIDTH = 500;
const GAMEHEIGHT = 500;

const playerSize = 20;
const MOVEMENTSPEED = 10;
var player;
var score = 0;

const COINSIZE = 10;
const COIN_TIMEOUT = 2000;
var coin;

var gameState = "play";

function setup() {
	console.log("setup: ");

	cnv = new Canvas(GAMEWIDTH, GAMEHEIGHT);
    player = new Sprite(100, 100, playerSize, playerSize);
    player.color = 'purple';

	coins = new Group();

    coins.add(createCoin());

    player.collides(coins, getPoint);
    function getPoint(collider1, collider2) {
        collider2.remove();
        score++;
    }
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {

	if (gameState == "play"){
		runGame();
	}
	else if (gameState == "lose"){
		loseScreen();
	}
}

/*******************************************************/
// runGame()
/*******************************************************/
function runGame(){
	background('pink');
	if (random(0, 1000) < 10){
		coins.add(createCoin());
	}
    movePlayer();
	for (var i = 0; i < coins.length; i++){
		// Check coin time, should return true if the coin is old and needs to be deleted
		if (checkCoinTime(coins[i])){
			coins[i].remove();
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
	coins.remove();
	fill(0, 0, 0);
    textSize(40);
    text("You missed a coin!", 10, 200);

	text("Score: " + score, 10, 250);
}

/*******************************************************/
// checkCoinTime()
/*******************************************************/
function checkCoinTime(_coin){
    //Check if the coin has been around too long (COIN_TIMEOUT milliseconds)
    if (_coin.spawntime + COIN_TIMEOUT < millis()){
		return(true); // Coin is old
    }
	return(false); //Coin is young
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
// createCoin()
/*******************************************************/
function createCoin(){
    var coin = new Sprite(random(0, GAMEHEIGHT), random(0, GAMEHEIGHT), playerSize);
    coin.color = 'yellow';
    coin.spawntime = millis();
	return(coin);
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