// --- PERLIN NOISE VISUALIZATION ---
void perlinNoise(){
  noStroke();
  smooth();
   for(int i = 0; i < numParticles; i++){
    float radius = map(i,0,numParticles,1,2);
    float alpha = map(i,0,numParticles,0,250);

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
}  

// Particle Class (each line? multiple visualizations?)
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
