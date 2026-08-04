const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const count = document.getElementById('count');
const extra = document.getElementById('extra');

// Time
let baseTick = 100;
let tick = 100;
let lastUpdate = 0;
let shiftSpeed = 50;


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
// Логика должна каждую отрисовку перемещать увелечение snake[eatHere] на следующий обьект массива snake
// Мне нужно сделать так, чтобы eatHere увеличивался только на следующей итерации отрисовки, то-есть через кадр
function drawSnake() {
  snake.forEach((segment, index) => {
    let w = horizontalSize;
    let h = verticalSize;
    let r = 1;
    color = 'green';

    if (index === 0) {
      w += 1;
      h += 1;
      color = 'yellowgreen';
      r = 2;
    }
    else if (index === snake.length - 1) {
      w -= 1;
      h -= 1;
      color = '#228B22';
    }
    else if (index % 2 === 0) {
      color = 'lime';
    }

    if (eatInSnake && eatHere === index) {
      w += 4;
      h += 4;
      eatHere++;
      
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
  eatInSnake = false;
}

// Move
let currentDirection = "U"; 
let moveWay = "U";

function updateSnakePosition() {

function turnLeft() {
  if(currentDirection !== "R") {
    let head = snake[0];
    let newSnake = [];
    newSnake.push({x: head.x - horizontalSize, y: head.y});
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
    newSnake.push({x: head.x + horizontalSize, y: head.y});
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
    newSnake.push({x: head.x, y: head.y - verticalSize});
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
    newSnake.push({x: head.x, y: head.y + verticalSize});
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
    tick = shiftSpeed;
  }
})
document.addEventListener('keyup', (e) => {
  if(e.key === 'Shift'){
    tick = baseTick;
  }
})

// Food
let listCount = 0;
let speedUp = 0;
let food = [{x: Math.floor(Math.random() * (canvas.width / 5)) * 5, y: Math.floor(Math.random() * (canvas.height / 5)) * 5, width: 5, height: 5, color: 'red'}];
let extraFood = [{x: Math.floor(Math.random() * (canvas.width / 5)) * 5, y: Math.floor(Math.random() * (canvas.height / 5)) * 5, width: 5, height: 5, color: 'yellowgreen'}];
let eatInSnake = false;
let eatHere = 1;
let colorFood = 'red';

function drawFood() {
  if(speedUp == 2){
    baseTick -= 0.5;
    shiftSpeed -= 0.5;
    speedUp = 0;
  } 

  if (listCount >= food.length) return;
  const f = food[listCount];
  const cx = f.x + f.width/2;
  const cy = f.y + f.height/2;
  const r = f.width/2;
  // Apple body
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = colorFood;
  ctx.fill();
  ctx.strokeStyle = colorFood;
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

  // Теперь бонусное яблоко появляется, но не сьедается
  if(listCount == 0) {
  const df = extraFood[0];
  const dcx = df.x + df.width/2;
  const dcy = df.y + df.height/2;
  const dr = df.width/2;
  // Apple body
  ctx.beginPath();
  ctx.arc(dcx, dcy, dr, 0, Math.PI * 2);
  ctx.fillStyle = df.color;
  ctx.fill();
  ctx.strokeStyle = df.color;
  ctx.lineWidth = 2;
  ctx.stroke();
  // Stem
  ctx.beginPath();
  ctx.moveTo(dcx, dcy - dr);
  ctx.lineTo(dcx + 1, dcy - dr - 2);
  ctx.strokeStyle = '#4a2f1a';
  ctx.lineWidth = 1;
  ctx.stroke();
  // Leaf
  ctx.beginPath();  
  ctx.ellipse(dcx + 2, dcy - dr - 2, 1.5, 0.8, 0.5, 0, Math.PI * 2);
  ctx.fillStyle = '#2e7d32';
  ctx.fill();
  }

}

function eatFood() {
  let horizontal, vertical, overlap;
  if(snake[0].x === food[listCount].x && snake[0].y === food[listCount].y) {
    const last = snake[snake.length -1];
    snake.push({x: last.x, y: last.y});
    listCount++;
    speedUp++;
    eatInSnake = true;
    eatHere = 1;
    // Eat position logic
    do {
      horizontal = Math.floor(Math.random() * (canvas.width / 5)) * 5;
      vertical = Math.floor(Math.random() * (canvas.height / 5)) * 5;
      overlap = snake.some(seg => seg.x === horizontal && seg.y === vertical);
    } while (overlap);
    food.push({x: horizontal, y: vertical, width: horizontalSize, height: verticalSize});

    if(exScTi != 0){
      const last = snake[snake.length -1];
      snake.push({x: last.x, y: last.y});
      listCount++;
      do {
        horizontal = Math.floor(Math.random() * (canvas.width / 5)) * 5;
        vertical = Math.floor(Math.random() * (canvas.height / 5)) * 5;
        overlap = snake.some(seg => seg.x === horizontal && seg.y === vertical);
      } while (overlap);
      food.push({x: horizontal, y: vertical, width: horizontalSize, height: verticalSize});
    }
  }
  if(snake[0].x === extraFood[0].x && snake[0].y === extraFood[0].y){
    // Extra time start
    startExtraTime = Date.now();
    countdown();
    //
    const last = snake[snake.length -1];
    snake.push({x: last.x, y: last.y});
    listCount++;
    speedUp++;
    do {
      horizontal = Math.floor(Math.random() * (canvas.width / 5)) * 5;
      vertical = Math.floor(Math.random() * (canvas.height / 5)) * 5;
      overlap = snake.some(seg => seg.x === horizontal && seg.y === vertical);
    } while (overlap);
    food.push({x: horizontal, y: vertical, width: horizontalSize, height: verticalSize});
    do {
      horizontal = Math.floor(Math.random() * (canvas.width / 5)) * 5;
      vertical = Math.floor(Math.random() * (canvas.height / 5)) * 5;
      overlap = snake.some(seg => seg.x === horizontal && seg.y === vertical);
    } while (overlap);
    extraFood.push({x: horizontal, y: vertical, width: horizontalSize, height: verticalSize});
  }
  // Count 
    count.textContent = "Счёт = " + listCount;
    extra.textContent = "Бонус = " + exScTi;
}

let startExtraTime;
let exScTi = 0; // extraScreenTime

function countdown() { // Обратный отсчет екстра времени
    const now = Date.now();
    const elapsed = (now - startExtraTime) / 1000;
    const remaining = Math.max(0, 30 - elapsed);
    if (remaining > 0) requestAnimationFrame(countdown);
    exScTi = Math.ceil(remaining);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(time) {
  if(time-lastUpdate >= tick){
    lastUpdate = time;
      clearCanvas();
      updateSnakePosition();
      drawSnake();
      drawFood();
      eatFood();
      console.log(extraFood);
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();