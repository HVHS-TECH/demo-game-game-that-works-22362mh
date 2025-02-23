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

function setup() {
	console.log("setup: ");

	cnv = new Canvas(GAMEWIDTH, GAMEHEIGHT);
    player = new Sprite(100, 100, playerSize, playerSize);
    player.color = 'purple';

    createCoin();

    player.collides(coin, getPoint);
    function getPoint(collider1, collider2) {
        collider2.remove();
        score++;
    }
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background('pink');

    movePlayer();
    checkCoinTime();
    displayScore();
}

function checkCoinTime(){
    //Check if the coin has been around too long (COIN_TIMEOUT milliseconds)
    if (coin.spawntime + COIN_TIMEOUT < millis()){
        coin.remove();
    }
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
    coin = new Sprite(random(0, GAMEHEIGHT), random(0, GAMEHEIGHT), playerSize);
    coin.color = 'yellow';
    coin.spawntime = millis();
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