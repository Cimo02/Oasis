var particles_a = [];
var particles_b = [];
var particles_c = [];
var nums = 200;
var noiseScale = 800;

var firstLoop = true;

function setup(){
  // window settings
  createCanvas(windowWidth, windowHeight);
  background(230, 233, 235);
  
  // setup GUI font and prepare to write the first message
  textFont('DM Sans');
  strokeWeight(2);
  textSize(40);
  textAlign(CENTER);
  firstLoop = true;
  
  // create buttons
  
  // create particles
  for(var i = 0; i < nums; i++){
    particles_a[i] = new Particle(random(0, width),random(0,height));
    particles_b[i] = new Particle(random(0, width),random(0,height));
    particles_c[i] = new Particle(random(0, width),random(0,height));
  }
}

// update function
function draw(){
  smooth();
  fill(132,164,246,255);
  
  if (firstLoop) {
    drawGUI(); 
  }
  
  noStroke();
  
  for(var i = 0; i < nums; i++){
    var radius = map(i,0,nums,1,2);
    var alpha = map(i,0,nums,0,250);

    fill(132,164,246,10);
    particles_a[i].move();
    particles_a[i].display(radius);
    particles_a[i].checkEdge();

    fill(132,164,246,30);
    particles_b[i].move();
    particles_b[i].display(radius);
    particles_b[i].checkEdge();

    fill(132,164,246,50);
    particles_c[i].move();
    particles_c[i].display(radius);
    particles_c[i].checkEdge();
  } 
  
  firstLoop = false;
}

function drawGUI(){
  stroke(132,164,246, 255);
  text("Where do you feel most relaxed?", windowWidth/2, windowHeight/4);
}

// Particle Class
function Particle(x, y){
  this.dir = createVector(0, 0);
  this.vel = createVector(0, 0);
  this.pos = createVector(x, y);
  this.speed = 0.4;

  this.move = function(){
    var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed);
    this.pos.add(this.vel);
  }

  this.checkEdge = function(){
    if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
      this.pos.x = random(50, width);
      this.pos.y = random(50, height);
    }
  }

  this.display = function(r){
    ellipse(this.pos.x, this.pos.y, r, r);
  }
}
