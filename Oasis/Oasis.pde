int ques1; // answers can be 0-3
int ques2;
int ques3;

String question1 = "Where do you feel most relaxed?"; // questions to ask the user in order to personalize their experience
String question2 = "What color relaxes you the most?";
String question3 = "Which shape do you prefer?";

boolean overBtn0 = false; // button variables (3 or 4 options?)
boolean overBtn1 = false;
boolean overBtn2 = false;
//boolean overBtn3 = false;
color btnColor, btnHoverColor, btnTextColor;
int btnWidth = 400;
int btnHeight = 350;

int scene; // 0-2 are questions, 3 is the visualization?

PFont DMSans_Regular; // custom font: DM Sans (https://fonts.google.com/specimen/DM+Sans?selection.family=DM+Sans)

// Particle Variables
int noiseScale = 800;
int numParticles = 200;
Particle[] particles_a = new Particle[200];
Particle[] particles_b = new Particle[200];
Particle[] particles_c = new Particle[200];

// --- CORE METHODS ---
// runs once at the beginning of the program
void setup() {
  // --- setup the app window ---
  size(1920, 1080);
  background(230, 233, 235);
  // --- setup the question and scene variables ---
  ques1 = -1;
  ques2 = -1;
  ques3 = -1;
  scene = 0;
  // --- text settings ---
  DMSans_Regular = createFont("DMSans-Regular.ttf", 40);
  textFont(DMSans_Regular);
  textSize(40);
  // --- button settings ---
  btnColor = color(132,164,246);
  btnHoverColor = color(192,209,252);
  btnTextColor = color(240,245,249);
  // --- particle settings ---
  for(int i = 0; i < numParticles; i++){
    particles_a[i] = new Particle(random(0, width),random(0,height));
    particles_b[i] = new Particle(random(0, width),random(0,height));
    particles_c[i] = new Particle(random(0, width),random(0,height));
  }
}

// updates every frame to draw something
void draw() {
  // call update method 
  update(mouseX, mouseY);
  
  // drawing settings for every frame (don't change?)
  noStroke();
  fill(132,164,246,255);
  
  // drawing(gameplay) loop
  switch(scene){
    case 0: // Question 1
      clearScreen();
      textAlign(LEFT);
      textSize(80);
      drawText(question1, 100, 200);
      textSize(40);
      drawButtons("In Nature", "At Home", "With Friends");
      break;
    case 1: // Question 2
      clearScreen();
      textAlign(LEFT);
      textSize(80);
      drawText(question2, 100, 200);
      textSize(40);
      drawButtons("Red", "Blue", "Yellow");
      break;
    case 2: // Question 3
      clearScreen();
      textAlign(LEFT);
      textSize(80);
      drawText(question3, 100, 200);
      textSize(40);
      drawButtons("Circle", "Triangle", "Square");
      break;
    case 3: // Visualization
      perlinNoise();
      break;
  }
}



// --- INTERACTION METHODS ---
// method that tracks the position of the mouse and updates hover variables
void update(int x, int y) {
  if (overButton(width/4, 500)){
    overBtn0 = true; 
    overBtn1 = false;
    overBtn2 = false;
  } else if (overButton(2*width/4, 500)){
    overBtn0 = false;
    overBtn1 = true;
    overBtn2 = false;
  } else if (overButton(3*width/4, 500)){
    overBtn0 = false;
    overBtn1 = false;
    overBtn2 = true;
  } else {
    overBtn0 = overBtn1 = overBtn2 = false; 
  }
}

// method that tracks when the mouse is pressed
void mousePressed() {
   switch(scene){ // Check to see which question we're answering first
     case 0: // Answering Question 1
       if (overBtn0) { ques1 = 0; }
       else if (overBtn1) { ques1 = 1; }
       else if (overBtn2) { ques1 = 2; }
       else { ques1 = -1; }
       scene++;
       break; 
     case 1: // Answering Question 2
       if (overBtn0) { ques2 = 0; }
       else if (overBtn1) { ques2 = 1; }
       else if (overBtn2) { ques2 = 2; }
       else { ques2 = -1; }
       scene++;
       break;
     case 2: // Answer Question 3
       if (overBtn0) { ques3 = 0; }
       else if (overBtn1) { ques3 = 1; }
       else if (overBtn2) { ques3 = 2; }
       else { ques3 = -1; }
       clearScreen();
       scene++;
       break;
     case 3: // TODO: Add screenshotting here?
       break;
   }
}

// method to check if we're over a button (parameters are the buttons coords)
boolean overButton(int x, int y) {
  if (mouseX >= x-btnWidth/2 && mouseX <= x+btnWidth/2 && mouseY >= y-btnHeight/2 && mouseY <= y+btnHeight/2) {
    return true;
  }
  else {
    return false; 
  }
}



// --- VISUALIZATION METHODS ---
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



// --- HELPER METHODS ---
void drawText(String text, int x, int y){
  text(text, x, y);
}

void drawButtons(String option1, String option2, String option3){
  textAlign(CENTER);
  rectMode(CENTER);
  
  // button 1
  if (overBtn0){ fill(btnHoverColor); }
  else { fill(btnColor); }
  rect(width/4, 500, btnWidth, btnHeight, 20);
  fill(btnTextColor);
  drawText(option1, width/4, 500);
  
  // button 2
  if (overBtn1){ fill(btnHoverColor); }
  else { fill(btnColor); }
  rect(2*width/4, 500, btnWidth, btnHeight, 20);
  fill(btnTextColor);
  drawText(option2, 2*width/4, 500);
  
  // button 3
  if (overBtn2){ fill(btnHoverColor); }
  else { fill(btnColor); }
  rect(3*width/4, 500, btnWidth, btnHeight, 20);
  fill(btnTextColor);
  drawText(option3, 3*width/4, 500);
}

void clearScreen() {
  background(230, 233, 235);
}



// --- Classes ---
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
