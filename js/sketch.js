// CCLab p5.js template project A
let openMouth = false;
let xPos = 0; // initial x-position for moving the entire code
let xSpeed = 0.8; // initial speed of movement
let legAngle1 = 0; // initial angle for leg movement
let legAngle2 = 0; // initial angle for leg movement
let appleX;
let appleY;
let feedCount = 0;
let maxFeedCount; // max number of feeds before pig dies
let pigAlive = true;
let startTime; // variable to store the start time
let elapsedTime = 0; // elapsed time
let totalTime = 15; // total time in seconds

function setup() {
  createCanvas(800, 500);
  strokeWeight(4);
  appleX = mouseX;
  appleY = mouseY;
  maxFeedCount = random(5, 15); // random max number for feeds
  startTime = millis(); 
}

function draw() {
  background(135, 206, 235);

  fill(150, 75, 0); // brow
  // land 
  beginShape();
  vertex(0, height); // left-bottom corner is starting point

  // Bezier curve control points
  let controlX1 = width * 0.3;
  let controlY1 = height * 0.6;
  let controlX2 = width * 0.3;
  let controlY2 = height * 0.9;
  let endX = width;
  let endY = height / 2;
  // Bezier curve segment
  bezierVertex(controlX1, controlY1, controlX2, controlY2, endX, endY);
  vertex(width, height); // right-bottom corner
  vertex(0, height); // left-bottom corner
  endShape(CLOSE);

  push();

  // move the entire code from left to right at set speed
  if (pigAlive) {
    xPos += xSpeed;

    // if xPos exceeds half the width or goes below 0, direction reverses 
    if (xPos >= width / 2 || xPos <= 0) {
      xSpeed *= -1; // reverse the direction of movement
    }
  }

  translate(xPos, 0);

  fill(255, 192, 203);

  // leg moving using sin 
  let legOffset = sin(legAngle1) * 20; // amplitude 
  let legOnset = sin(legAngle2) * 20; // amplitude
  legAngle1 += 0.055; // increases angle to control the speed of movement
  legAngle2 -= 0.055; // increase angle to control the speed of movement

  // legs with oscillating x-coordinates
  rect(125 - legOnset, 250 + legOnset, 25, 125);
  rect(250 + legOffset, 250 + legOffset, 25, 125);
  fill(0);
  rect(125 - legOnset, 350 + legOnset, 25, 25);
  rect(250 + legOffset, 350 + legOffset, 25, 25);

  fill(255, 192, 203);

  // body
  ellipse(200, 200, 255, 250);

  // ears
  ellipse(165, 150, 25, 50);
  ellipse(235, 150, 25, 50);

  // face
  circle(200, 200, 125);

  // Draw eyes
  if (pigAlive) {
    fill(255);
    circle(175, 170, 25);
    circle(225, 170, 25);
    fill(0);
    circle(175, 170, 10);
    circle(225, 170, 10);
  } else {
    // x's for eyes when the pig is dead
    line(165, 160, 185, 180);
    line(165, 180, 185, 160);
    line(215, 160, 235, 180);
    line(215, 180, 235, 160);
  }

  // nose
  fill(255, 192, 203);
  ellipse(200, 210, 50, 25);
  fill(0);
  circle(190, 210, 10);
  circle(210, 210, 10);

  // mouth
  noFill();
  if (openMouth && pigAlive) {
    arc(200, 240, 50, 20, 0, TWO_PI); // mouth is open
  } else {
    arc(200, 225, 50, 50, PI * 0.25, PI * 0.75); // default mouth shape
  }

  pop();

  // apple
  fill(255, 0, 0); // red
  circle(mouseX, mouseY, 50); // apple

  // display feed count
  textSize(20);
  fill(0);
  text(`Feed Count: ${feedCount}`, 10, 30);

  // Check if the pig has died
  if (feedCount > maxFeedCount || elapsedTime >= totalTime) {
    pigAlive = false;
    text("You killed Pig! Click to restart!", width / 2 - 120, height / 4);
  }

  // display timer
  let remainingTime = totalTime - int(elapsedTime); // remaining time in seconds
  text("Time remaining: " + remainingTime + " seconds", width / 2, height - 20);

  // update elapsed time
  if (pigAlive) {
    elapsedTime = (millis() - startTime) / 1000;
  }
}

function mousePressed() {
  if (!pigAlive) {
    // restart the game if the pig is dead and mouse is clicked
    restartGame();
  } else {
    openMouth = true;
    feedCount++;
  }
}

function mouseReleased() {
  openMouth = false;
}

