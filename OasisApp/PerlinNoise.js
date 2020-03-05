// --- PERLIN NOISE VISUALIZATION ---
function perlinNoise(){
  noStroke();
  smooth();
  // -- draw all particle updates --
  for(var i = 0; i < numParticles; i++){
    var radius = map(i,0,numParticles,1,2);
    var alpha = map(i,0,numParticles,0,250);

    fill(firstColor);
    particles_a[i].move();
    particles_a[i].display(radius);
    particles_a[i].checkEdge();

    fill(secondColor);
    particles_b[i].move();
    particles_b[i].display(radius);
    particles_b[i].checkEdge();

    fill(thirdColor);
    particles_c[i].move();
    particles_c[i].display(radius);
    particles_c[i].checkEdge();
  }  
}  

// Particle Class (each line? multiple visualizations?)
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
