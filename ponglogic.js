// Canvas setup
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Ball setup
var ballRadius = 20;
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballSpeedX = 5;
var ballSpeedY = 5;

// Paddle setup
var paddleWidth = 15;
var paddleHeight = 100;
var paddleY = canvas.height / 2 - paddleHeight / 2;
var paddleSpeed = 5;

// Computer paddle setup
var computerPaddleY = canvas.height / 2 - paddleHeight / 2;

// Score setup
var playerScore = 0;
var computerScore = 0;

// Function to check score as condition of end game function
const maxScore = 20;
function checkScore() {
	if (playerScore >= maxScore || computerScore >= maxScore) {
		endGame();
	}
}

// Function to end game when score = 20 and display game over message
function endGame() {
	if (playerScore >= maxScore) {
		const scoreElement = document.getElementById("gameOverPlayer");
		scoreElement.textContent = "Player Wins, Game Over!";
		setTimeout(() => {
		scoreElement.textContent = "";
		}, 2000)	 
	} else {
		const scoreElement = document.getElementById("gameOverAI");
		scoreElement.textContent = "AI Wins, Game Over!"; 
		setTimeout(() => {
		scoreElement.textContent = "";
		}, 2000)
	}
	// Scores reset when game ends
	computerScore = 0;
	playerScore = 0;
}

// Key input setup
var upPressed = false;
var downPressed = false;

// Event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Key input functions
function keyDownHandler(event) {
	if (event.keyCode == 38) {
		upPressed = true;
	} else if (event.keyCode == 40) {
		downPressed = true;
	}
}

function keyUpHandler(event) {
	if (event.keyCode == 38) {
		upPressed = false;
	} else if (event.keyCode == 40) {
		downPressed = false;
	}
}

// Draw ball function
function drawBall() {
	const shadowBlur = 30;
	ctx.strokeStyle = "#453673";
    ctx.fillStyle = "white";
    ctx.shadowColor = "#ff77ff";
    ctx.shadowBlur = shadowBlur;
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	ctx.shadowBlur = 0;
	
}

// Draw paddles function
function drawPaddles() {
	// Player paddle
	ctx.beginPath();
	ctx.rect(0, paddleY, paddleWidth, paddleHeight);
	ctx.fillStyle = "#453673";
	ctx.fill();
	ctx.closePath();

	// Computer paddle
	ctx.beginPath();
	ctx.rect(canvas.width - paddleWidth, computerPaddleY, paddleWidth, paddleHeight);
	ctx.fillStyle = "#453673";
	ctx.fill();
	ctx.closePath();
	
}

// Collision detection function
function collisionDetection() {
	// Ball and player paddle
	if (ballX - ballRadius <= paddleWidth && ballY >= paddleY && ballY <= paddleY + paddleHeight) {
		ballSpeedX = -ballSpeedX;
	}

	// Ball and computer paddle
	if (ballX + ballRadius >= canvas.width - paddleWidth && ballY >= computerPaddleY && ballY <= computerPaddleY + paddleHeight) {
		ballSpeedX = -ballSpeedX;
	}

	// Ball and top/bottom walls
	if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
		ballSpeedY = -ballSpeedY;
	}

	// Ball and left/right walls
	if (ballX - ballRadius <= 0) {
		computerScore++;
		// Display message when AI scores point
		const scoreElement = document.getElementById("scoreAI");
		scoreElement.textContent = "AI scored a point!";
		
		// Clear the message after 2 seconds
		setTimeout(() => {
		scoreElement.textContent = "";
  		}, 2000); // 2000 milliseconds = 2 seconds
		checkScore();
		resetBall();
	} else if (ballX + ballRadius >= canvas.width) {
		playerScore++;
		// Display message when player scores a point
		const scoreElement = document.getElementById("scorePlayer");
		scoreElement.textContent = "Player scored a point!";
		
		// Clear message after 2 seconds
		setTimeout(() => {
		scoreElement.textContent = "";
 		}, 2000); // 2000 milliseconds = 2 seconds
		checkScore();
		resetBall();
	}
}

// Reset ball function
function resetBall() {
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
	ballSpeedX = -ballSpeedX;
	ballSpeedY = -ballSpeedY;
}

// Update function
function update() {
	// Move player paddle
	if (upPressed && paddleY > 0) {
		paddleY -= paddleSpeed;
	} else if (downPressed && paddleY + paddleHeight < canvas.height) {
		paddleY += paddleSpeed;
	}

// Move computer paddle
if (ballY < computerPaddleY + paddleHeight / 2 && computerPaddleY > 0) {
computerPaddleY -= paddleSpeed;
} else if (ballY > computerPaddleY + paddleHeight / 2 && computerPaddleY + paddleHeight < canvas.height) {
computerPaddleY += paddleSpeed;
}

// Update ball position
ballX += ballSpeedX;
ballY += ballSpeedY;

// Collision detection
collisionDetection();

// Clear canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw objects
drawBall();
drawPaddles();

// Draw scores
ctx.font = "50px Georgia";
ctx.fillStyle = "#453673";
ctx.fillText(playerScore, canvas.width / 3, 475);
ctx.fillText(computerScore, canvas.width * 2 / 3, 475);
}

// Game loop
setInterval(update, 20);