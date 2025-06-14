const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let bird, pipes, score, gameOver, frame, gravity, jump;

function resetGame() {
  bird = { x: 80, y: canvas.height / 2, r: 12, velocity: 0 };
  pipes = [];
  score = 0;
  frame = 0;
  gravity = 0.5;
  jump = -8;
  gameOver = false;
  document.getElementById('game-over').style.display = 'none';
}

function pipe() {
  const gap = 120;
  const top = Math.random() * (canvas.height - gap - 100) + 50;
  return { x: canvas.width, top, bottom: top + gap };
}

function drawBird() {
  ctx.fillStyle = '#ff0';
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#000';
  ctx.stroke();
}

function drawPipes() {
  ctx.fillStyle = '#0f0';
  pipes.forEach(p => {
    ctx.fillRect(p.x, 0, 40, p.top);
    ctx.fillRect(p.x, p.bottom, 40, canvas.height - p.bottom);
  });
}

function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 25);
}

function update() {
  if (gameOver) return;
  frame++;
  bird.velocity += gravity;
  bird.y += bird.velocity;

  if (frame % 100 === 0) pipes.push(pipe());
  pipes.forEach(p => p.x -= 2);

  // remove off-screen pipes
  if (pipes.length && pipes[0].x < -40) { pipes.shift(); score++; }

  // collision detection
  pipes.forEach(p => {
    if (
      bird.x + bird.r > p.x &&
      bird.x - bird.r < p.x + 40 &&
      (bird.y - bird.r < p.top || bird.y + bird.r > p.bottom)
    ) {
      gameOver = true;
    }
  });

  if (bird.y + bird.r > canvas.height || bird.y - bird.r < 0) {
    gameOver = true;
  }

  if (gameOver) {
    document.getElementById('game-over').style.display = 'block';
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPipes();
  drawBird();
  drawScore();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

function flap() {
  if (gameOver) {
    resetGame();
  }
  bird.velocity = jump;
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space') flap();
});
document.addEventListener('touchstart', flap);

resetGame();
loop();
