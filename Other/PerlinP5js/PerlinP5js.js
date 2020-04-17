let particles_a = [];
let particles_b = [];
let particles_c = [];

const numParticles = 200;
const noiseScale = 800;

let backgroundColor;
let lineColor;
let textColor;

function setup() {
  backgroundColor = color(230, 233, 235);
  lineColor = color(132, 164, 246);
  textColor = color(132, 164, 246);

  createCanvas(windowWidth, windowHeight);
  background(backgroundColor);

  textFont('DM Sans');
  textSize(40);
  textAlign(CENTER);
  strokeWeight(2);
  drawGUI();

  for (let i = 0; i < numParticles; i++) {
    particles_a[i] = new Particle(random(0, windowWidth), random(0, windowHeight));
    particles_b[i] = new Particle(random(0, windowWidth), random(0, windowHeight));
    particles_c[i] = new Particle(random(0, windowWidth), random(0, windowHeight));
  }

  noStroke();
  smooth();
}

function draw() {
  for (let i = 0; i < numParticles; i++) {
    let radius = map(i, 0, numParticles, 1, 2);

    lineColor.setAlpha(10);
    fill(lineColor);
    particles_a[i].move();
    particles_a[i].display(radius);
    particles_a[i].checkEdge();

    lineColor.setAlpha(30);
    fill(lineColor);
    particles_b[i].move();
    particles_b[i].display(radius);
    particles_b[i].checkEdge();

    lineColor.setAlpha(50);
    fill(lineColor);
    particles_c[i].move();
    particles_c[i].display(radius);
    particles_c[i].checkEdge();
  }
}

function drawGUI() {
  fill(textColor);
  stroke(textColor);
  text("Where do you feel most relaxed?", windowWidth/2, windowHeight/4);
}

function Particle(x, y) {
  this.dir = createVector(0, 0);
  this.vel = createVector(0, 0);
  this.pos = createVector(x, y);
  this.speed = 0.4;

  this.move = function() {
    var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed);
    this.pos.add(this.vel);
  };

  this.checkEdge = function() {
    if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
      this.pos.x = random(50, width);
      this.pos.y = random(50, height);
    }
  };

  this.display = function(r){
    ellipse(this.pos.x, this.pos.y, r, r);
  }
}