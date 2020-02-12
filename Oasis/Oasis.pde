int ques1; // answers can be 0-3
int ques2;
int ques3;
int ques4;

String question1 = "Where do you find yourself when you want to relax?"; // questions to ask the user in order to personalize their experience
String question2 = "What’s the most relaxing color to you?";
String question3 = "Favorite season or time of day?";
String question4 = "What visual (out of 3) is the most pleasing to you?";

boolean overBtn0 = false; // button variables, 3 options
boolean overBtn1 = false;
boolean overBtn2 = false;

color btnColor, btnHoverColor, btnTextColor;
int btnWidth = 450;
int btnHeight = 500;

int scene; // 0-3 are questions, 4 is the visualization?

PFont DMSans_Regular; // custom font: DM Sans (https://fonts.google.com/specimen/DM+Sans?selection.family=DM+Sans)

// Particle Variables
int noiseScale = 500;
int numParticles = 200;
Particle[] particles_a = new Particle[200];
Particle[] particles_b = new Particle[200];
Particle[] particles_c = new Particle[200];

// runs once at the beginning of the program
void setup() {
  // --- setup the app window ---
  size(1920, 1080);
  background(230, 233, 235);
  // --- setup the question and scene variables ---
  ques1 = -1;
  ques2 = -1;
  ques3 = -1;
  ques4 = -1;
  scene = 0;
  // --- text settings ---
  DMSans_Regular = createFont("DMSans-Regular.ttf", 40);
  textFont(DMSans_Regular);
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
      textSize(48);
      drawText(question1, 150, 150);
      textSize(40);
      drawButtons("In Nature", "At Home", "With Friends");
      break;
    case 1: // Question 2
      clearScreen();
      textAlign(LEFT);
      textSize(48);
      drawText(question2, 150, 150);
      textSize(40);
      drawButtons("Red", "Blue", "Yellow");
      break;
    case 2: // Question 3
      clearScreen();
      textAlign(LEFT);
      textSize(48);
      drawText(question3, 150, 150);
      textSize(40);
      drawButtons("Morning", "Afternoon", "Evening");
      break;
    case 3: // Question 3
      clearScreen();
      textAlign(LEFT);
      textSize(48);
      drawText(question3, 150, 150);
      textSize(40);
      drawButtons("#1", "#2", "#3");
      break;
    case 4: // Visualization
      // prints the question answers/hash to the visualization screen
      String answers = ques1 + " " + ques2 + " " + ques3 + " " + ques4;
      textSize(20);
      drawText(answers, 50, 50); 
      // -- TODO: check answers here and create settings/play the corresponding visualization
      perlinNoise();
      break;
  }
}
