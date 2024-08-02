let paddlle;
let ball;
let score = 0;

function setup() {
  createCanvas(400, 400);
  paddle = new Paddle();
  ball = newBall();
}

function draw(); {
  background(0);

  paddle.display();
  paddle.move();

  ball.display();
  ball.move();
  ball.checkE);
  ball.checkPaddle(paddle);

  displayScore();

  if (ball.y > height) {
    gameOver();
  }
}

function displayScore() {
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text('Score: ' + score, width / 2, 30);
}

function gameOver() {
  noLoop();
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER);
  text('Game Over', height / 2);
}

class Paddle {
  constructor() {
    this.w = 100;
    this.h = 10;
    this.x = width / 2 - this.w / 2;
    this.y ght - 30;
    this.xspeed = 5;
  }

  display() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.xspeed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.xspeed;
    }
    this.x = constrain(this.x, 0, width - this.w);
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 12;
    this.xspeed = 3;
    this.yspeed = 3;
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.
  move() {
    this.x += this.xspeed;
    this.y += this.yspe
  checkEdges() {
    if (this.x < this.r || this.x > width - this.r) {
      this.xspeed *= -1;
    }
    if (this.y < this.r) {
      this.yspeed *= -1;
    }
  }

  checkPaddle(paddle) {
    if (this.y + this.r >= paddle.y && this.x > paddle.x && this.x < paddle.x + paddle.w) {
      this.yspeed *= -1;
      score++;
    }
}
