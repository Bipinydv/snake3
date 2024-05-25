const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let canvasSize = Math.min(window.innerWidth, window.innerHeight) - 40;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let direction = { x: 0, y: 0 };
let food = randomFoodPosition();
let score = 0;

function randomFoodPosition() {
    return {
        x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
        y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize
    };
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function updateSnake() {
    const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = randomFoodPosition();
        score += 10;
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            resetGame();
        }
    }
}

function resetGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    direction = { x: 0, y: 0 };
    food = randomFoodPosition();
    score = 0;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    updateSnake();
    checkCollision();
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = direction.y === -1;
    const goingDown = direction.y === 1;
    const goingRight = direction.x === 1;
    const goingLeft = direction.x === -1;

    if (keyPressed === LEFT && !goingRight) {
        direction = { x: -1, y: 0 };
    }
    if (keyPressed === UP && !goingDown) {
        direction = { x: 0, y: -1 };
    }
    if (keyPressed === RIGHT && !goingLeft) {
        direction = { x: 1, y: 0 };
    }
    if (keyPressed === DOWN && !goingUp) {
        direction = { x: 0, y: 1 };
    }
}

document.addEventListener('keydown', changeDirection);
setInterval(gameLoop, 100);

function resizeCanvas() {
    canvasSize = Math.min(window.innerWidth, window.innerHeight) - 40;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();