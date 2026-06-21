const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const h1 = document.getElementById('h1');

// Snake
// Size 
let horizontalSize = 5, verticalSize = 5;
let snake = [
  {x: 130, y: 80} // Head
]

function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach(event => {
    ctx.fillRect(event.x, event.y, horizontalSize, verticalSize);
    }
  )
}

// Move
let currentDirection = "U"; 
let moveWay = "U";

function updateSnakePosition() {

function turnLeft() {
  if(currentDirection !== "R") {
    
    let head = snake[0];
    let newSnake = [];

    newSnake.push({x: head.x - 5, y: head.y});

    for(i = 0; i < snake.length - 1; i++) {
      newSnake.push(snake[i]);
    }

    snake = newSnake;
    currentDirection = "L";
  }
}

function turnRight() {
  if(currentDirection !== "L"){
    
    let head = snake[0];
    let newSnake = [];

    newSnake.push({x: head.x + 5, y: head.y});

    for(i = 0; i < snake.length - 1; i++) {
      newSnake.push(snake[i]);
    }

    snake = newSnake;
    currentDirection = "R";
  }
}

function turnUp() {
  if(currentDirection !== "D"){
    let head = snake[0];
    let newSnake = [];

    newSnake.push({x: head.x, y: head.y - 5});

    for(i = 0; i < snake.length - 1; i++) {
      newSnake.push(snake[i]);
    }

    snake = newSnake;
    currentDirection = "U";
  }
}

function turnDown() {
  if(currentDirection !== "U"){
    let head = snake[0];
    let newSnake = [];

    newSnake.push({x: head.x, y: head.y + 5});

    for(i = 0; i < snake.length - 1; i++) {
      newSnake.push(snake[i]);
    }

    snake = newSnake;
    currentDirection = "D";
  }
}

for(let i=1;i<snake.length;i++){
  if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
    snake = [{x: 130, y: 80}];
  }
};

  switch (moveWay) {
  case "U":
      turnUp();
    break;
  case "D":
    turnDown();
    break;
  case "L":
    turnLeft();
    break;
  case "R":
    turnRight();
    break;
  default:
      break;
  };

  let headX = snake[0].x;
  let headY = snake[0].y;
  if (headX >= canvas.width) headX = 0;
  if (headX < 0) headX = canvas.width;
  if (headY >= canvas.height) headY = 0;
  if (headY < 0) headY = canvas.height;
  snake[0].x = headX;
  snake[0].y = headY;
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp' :
      if(currentDirection !== "D"){
        moveWay = "U";
      };
      break;
    case 'ArrowDown' :
      if(currentDirection !== "U"){
        moveWay = "D";
      };
      break;
    case 'ArrowLeft' :
      if(currentDirection !== "R"){
        moveWay = "L";
      };
      break;
    case 'ArrowRight' :
      if(currentDirection !== "L"){
        moveWay = "R";
      }
      break;
  }
});

// Food
let listCount = 0;
let food = [];

function drawFood() {
  ctx.fillStyle = food[listCount].color;
  ctx.fillRect(food[listCount].x, food[listCount].y, food[listCount].width, food[listCount].height);
}

function eatFood() {
  // Food radius
  const ex = snake[0].x - food[listCount].x;
  const ey = snake[0].y - food[listCount].y;
  if (ex * ex + ey * ey < 5) {
    listCount++;
    snake[listCount] += {x: snake[0].x - 5, y: snake[0].y};
  }
}

  // Food position logic
for (i = 0; i < 299; i++) {
  let horizontal = Math.floor(Math.random() * 100 + Math.random() * 100);
  let vertical = Math.floor(Math.random() * 100 + 40);
  horizontal = Math.round(horizontal / 5) * 5, vertical = Math.round(vertical / 5) * 5;
  let obj = {x: horizontal, y: vertical, width: 5, height: 5, color: 'blue'};
  food.push(obj);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(() => {
  updateSnakePosition();
}, 100)

function gameLoop() {
  clearCanvas();
  drawSnake();
  drawFood();
  eatFood();
  requestAnimationFrame(gameLoop);
}

gameLoop();