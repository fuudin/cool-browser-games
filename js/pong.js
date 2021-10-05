var player;
var cube;
var ai;
var turntext;
var score1;
var score2;
var cubeDir = false;
var up = false;
var down = false;
var aiup = false;
var aidown = false;
var speed = 5;
var playerscore = 0;
var aiscore = 0; 

function startGame() {
    player = new component(10, 50, "black", 10, 220);
	ai = new component(10,50,"black",460,220);
	cube = new component(15,15,"black",240, 130);
	score1 = new component("30px", "Consolas", "black", 20, 40, "text");
	score2 = new component("30px", "Consolas", "black", 440, 40, "text");	
    gameCanvas.start();
}

var gameCanvas = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateCanvas, 20);
        window.addEventListener('keydown', function (e) {
            gameCanvas.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            gameCanvas.key = false;
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
	this.type = type;
    this.gamearea = gameCanvas;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = gameCanvas.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
    this.newPos = function() {
        this.x += this.speedX;
		if(this.y > 270) {
			this.y = -30;
		}
		if(this.y < -30) {
			this.y = 270;
		}
        this.y += this.speedY;
    }
}

function updateCanvas() {
    gameCanvas.clear();
    player.speedX = 0;
    player.speedY = 0;    
    <!-- if (gameCanvas.key && gameCanvas.key == 37) {player.speedX = -1; } -->
    <!-- if (gameCanvas.key && gameCanvas.key == 39) {player.speedX = 1; } -->
    if (gameCanvas.key && gameCanvas.key == 38) {player.speedY = -speed;}
    if (gameCanvas.key && gameCanvas.key == 40) {player.speedY = speed;}
	
	minX = 20;
	minY = player.y;
	maxY = player.y + player.height;
	
	minX2 = 440;
	minY2 = ai.y;
	maxY2 = ai.y + ai.height;
	
	if(cube.x <= minX && cube.y >= minY && cube.y <= maxY) {
		up = false;
		down = false;
		if (gameCanvas.key && gameCanvas.key == 38) {up = true;}
		if (gameCanvas.key && gameCanvas.key == 40) {down = true;}
		cubeDir = false;
		speed += 0.1;
		}
		
	if(cube.x >= minX2 && cube.y > minY2 && cube.y < maxY2) {
		if(aiup) {
			up = true;
		}
		if(aidown) {
			down = true;
		}
		aiup = false;
		aidown = false;
		<!-- if (gameCanvas.key && gameCanvas.key == 38) {up = true;} -->
		<!-- if (gameCanvas.key && gameCanvas.key == 40) {down = true;} -->
		<!-- score += 1; -->
		cubeDir = true;
		speed += 0.1;
		}
	
	aicent = ai.y + 10;
	if(cube.y > aicent) {
		ai.y += speed;
		aiup = false;
		aidown = true;
		}
	if(cube.y < aicent) {
		ai.y -= speed;
		aidown = false;
		aiup = true;
		}
		
	if(cube.y == aicent) {
		aiup = false;
		aidown = false;
		}
	if(cube.x >= 465) {
		up = false;
		down = false;
		aiup = false;
		aidown = false;
		speed = 5;
		playerscore += 1;
		cube.x = 240;
		cube.y = ai.y;
		cubeDir = false;
	}
	else if (cube.x <= 0) {
		up = false;
		down = false;
		aiup = false;
		aidown = false;
		speed = 5;
		aiscore += 1;
		cube.x = 240;
		cube.y = player.y + 15;
		cubeDir = true;
	}
	if (cube.y >= 265) {
		if(down) {
			down = false;
			up = true;
		}
	}
	else if (cube.y <= 0) {
		if(up) {
			up = false;
			down = true;
		}
		}
	
	if(cubeDir === false) {
		if(up){
		cube.y -=speed;
		}
		else if(down){
		cube.y +=speed; 
		}
		cube.x += speed;
	}
	else {
		if(up){
		cube.y -=speed;
		}
		else if(down){
		cube.y +=speed; 
		}
		cube.x -= speed;
		}
	if(playerscore < 10) {
		score1.text = playerscore;
	} else {
		score1.text = "9+"
	}
	if (aiscore < 10) {
		score2.text = aiscore;
	} else {
		score2.text = "9+"
		score2.x = 430;
	}
	score1.update();
	score2.update();
	ai.update();
	cube.update();
    player.newPos();    
    player.update();
}