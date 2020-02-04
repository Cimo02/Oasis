Particle[] particles_a = new Particle[300];
Particle[] particles_b = new Particle[300];
Particle[] particles_c = new Particle[300];
int nums = 300;
int noiseScale = 800;

void setup(){
  size(1800, 800);
  background(21, 8, 50);
  for(int i = 0; i < nums; i++){
    particles_a[i] = new Particle(random(0, width),random(0,height));
    particles_b[i] = new Particle(random(0, width),random(0,height));
    particles_c[i] = new Particle(random(0, width),random(0,height));
  }
}

void draw(){
  noStroke();
  smooth();
    for(int i = 0; i < nums; i++){
    float radius = map(i,0,nums,1,2);
    float alpha = map(i,0,nums,0,250);

    fill(69,33,124,alpha);
    particles_a[i].move();
    particles_a[i].display(radius);
    particles_a[i].checkEdge();

    fill(7,153,242,alpha);
    particles_b[i].move();
    particles_b[i].display(radius);
    particles_b[i].checkEdge();

    fill(255,255,255,alpha);
    particles_c[i].move();
    particles_c[i].display(radius);
    particles_c[i].checkEdge();
  }  
}

// Particle Class (each line?)
class Particle {
  PVector dir, vel, pos;
  float speed;
  
  // Particle constructor
  Particle (float x, float y) {
      dir = new PVector(0,0);
      vel = new PVector(0,0);
      pos = new PVector(x, y);
      speed = 0.4;
  }

  void move(){
    float angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(speed);
    this.pos.add(vel);
  }

  void checkEdge(){
    if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
      this.pos.x = random(50, width);
      this.pos.y = random(50, height);
    }
  }

  void display(float r){
    ellipse(this.pos.x, this.pos.y, r, r);
  }
}
