const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const h1 = document.getElementById('h1');
const count = document.getElementById('count');

// Time
let tick = 100;
let lastUpdate = 0;
let baseTick = 100;

// Snake
// Size 
let horizontalSize = 5, verticalSize = 5;
let snake = [
  {x: 130, y: 80} // Head
]

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawSnake() {
  snake.forEach((segment, index) => {
    let w = horizontalSize;
    let h = verticalSize;
    let r = 1;
    let color = 'green';

    if (index === 0) {
      w += 1;
      h += 1;
      color = 'yellowgreen';
      r = 2;
    }
    else if (index === snake.length - 1) {
      w = horizontalSize - 1;
      h = verticalSize - 1;
      color = '#228B22';
    }
    else if (index % 2 === 0) {
      color = 'lime';
    }

    const x = segment.x + (horizontalSize - w) / 2;
    const y = segment.y + (verticalSize - h) / 2;

    roundRect(ctx, x, y, w, h, r);
    ctx.fillStyle = color;
    ctx.fill();

    // Eyes
    if (index === 0) {
      ctx.fillStyle = 'black';
      const eyeSize = 1;
      let ex1, ey1, ex2, ey2;
      switch (currentDirection) {
        case 'U':
          ex1 = segment.x + 1; ey1 = segment.y + 1;
          ex2 = segment.x + 3; ey2 = segment.y + 1;
          break;
        case 'D':
          ex1 = segment.x + 1; ey1 = segment.y + 3;
          ex2 = segment.x + 3; ey2 = segment.y + 3;
          break;
        case 'L':
          ex1 = segment.x + 1; ey1 = segment.y + 1;
          ex2 = segment.x + 1; ey2 = segment.y + 3;
          break;
        case 'R':
          ex1 = segment.x + 3; ey1 = segment.y + 1;
          ex2 = segment.x + 3; ey2 = segment.y + 3;
          break;
        }
      ctx.fillRect(ex1, ey1, eyeSize, eyeSize);
      ctx.fillRect(ex2, ey2, eyeSize, eyeSize);
      ctx.fillStyle = 'black';
      ctx.fillRect(ex1 + 0.5, ey1 + 0.5, 0.5, 0.5);
      ctx.fillRect(ex2 + 0.5, ey2 + 0.5, 0.5, 0.5);
        }
  });
}

// Move
let currentDirection = "U"; 
let moveWay = "U";
let speed = 5;
function updateSnakePosition() {

function turnLeft() {
  if(currentDirection !== "R") {
    let head = snake[0];
    let newSnake = [];
    newSnake.push({x: head.x - speed, y: head.y});
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
    newSnake.push({x: head.x + speed, y: head.y});
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
    newSnake.push({x: head.x, y: head.y - speed});
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
    newSnake.push({x: head.x, y: head.y + speed});
    for(i = 0; i < snake.length - 1; i++) {
      newSnake.push(snake[i]);
    }
    snake = newSnake;
    currentDirection = "D";
  }
}
// Game over
  if(snake.length > 2){
    for(let i=1;i<snake.length;i++){
      if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
        alert("Game Over");
        location.reload(); 
      }
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
  }
);
// Shift
document.addEventListener('keydown', (e) => {
  if(e.key === 'Shift'){
    tick -= 50;
  }
})
document.addEventListener('keyup', (e) => {
  if(e.key === 'Shift'){
    tick = baseTick;
  }
})

// Food
let listCount = 0;
let food = [];

function drawFood() {
  if (listCount >= food.length) return;
  const f = food[listCount];
  const cx = f.x + f.width/2;
  const cy = f.y + f.height/2;
  const r = f.width/2;
  // Apple body
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = '#ff3333';
  ctx.fill();
  ctx.strokeStyle = '#cc0000';
  ctx.lineWidth = 2;
  ctx.stroke();
  // Stem
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.lineTo(cx + 1, cy - r - 2);
  ctx.strokeStyle = '#4a2f1a';
  ctx.lineWidth = 1;
  ctx.stroke();
  // Leaf
  ctx.beginPath();
  ctx.ellipse(cx + 2, cy - r - 2, 1.5, 0.8, 0.5, 0, Math.PI * 2);
  ctx.fillStyle = '#2e7d32';
  ctx.fill();
}

function eatFood() {
  // First food
  let hor = Math.floor(Math.random() * (canvas.width / 5)) * 5;
  let ver = Math.floor(Math.random() * (canvas.height / 5)) * 5;
  food.push({x: hor, y: ver, width: 5, height: 5, color: 'blue'})
  // Food radius for eat better
  const ex = snake[0].x - food[listCount].x;
  const ey = snake[0].y - food[listCount].y;
  if (ex * ex + ey * ey < 5) {
    const last = snake[snake.length -1];
    snake.push({x: last.x, y: last.y});
    listCount++;
    // Eat position logic
    let horizontal, vertical, overlap;
    do {
      horizontal = Math.floor(Math.random() * (canvas.width / 5)) * 5;
      vertical = Math.floor(Math.random() * (canvas.height / 5)) * 5;
      overlap = snake.some(seg => seg.x === horizontal && seg.y === vertical);
    } while (overlap);
    food.push({x: horizontal, y: vertical, width: 5, height: 5, color: 'blue'});
  }
  // Count 
    count.textContent = "Счёт = " + listCount;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(time) {
  if(time - lastUpdate >= tick){
    lastUpdate = time;
    updateSnakePosition();
  };
  clearCanvas();
  drawSnake();
  drawFood();
  eatFood();
  requestAnimationFrame(gameLoop);
}

gameLoop();