int ques1; // answers can be 0-3
int ques2;
int ques3;

String question1 = "Where do you feel most relaxed?"; // questions to ask the user in order to personalize their experience
String question2 = "What color relaxes you the most?";
String question3 = "What?";
// button variables (3 or 4 options?)
boolean overBtn0 = false;
boolean overBtn1 = false;
boolean overBtn2 = false;
//boolean overBtn3 = false;
color btnColor, btnHoverColor, btnTextColor;
int btnWidth = 400;
int btnHeight = 350;

int scene; // 0-2 are questions, 3 is the visualization?

PFont DMSans_Regular; // custom font: DM Sans (https://fonts.google.com/specimen/DM+Sans?selection.family=DM+Sans)

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
      drawText(question1, 100, 150);
      drawButtons("In Nature", "At Home", "With Friends");
      break;
    case 1: // Question 2
      clearScreen();
      textAlign(LEFT);
      drawText(question2, 100, 150);
      break;
    case 2: // Question 3
      clearScreen();
      textAlign(LEFT);
      drawText(question3, 100, 150);
      break;
    case 3: // Visualization
      println("--- visualization begins ---");
      break;
  }
}



// --- INTERACTION METHODS ---
// method that tracks the position of the mouse and updates hover variables
void update(int x, int y) {
  
}

// method that tracks when the mouse is pressed
void mousePressed() {
   
}

// method to check if we're over a button (parameters are the buttons coords)
boolean overButton(int x, int y) {
  if (mouseX >= x && mouseX <= x+btnWidth && mouseY >= y && mouseY <= y+btnHeight) {
    return true;
  }
  else {
    return false; 
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
  fill(btnColor);
  rect(width/4, 500, btnWidth, btnHeight);
  fill(btnTextColor);
  drawText(option1, width/4, 500);
  
  // button 2
  fill(btnColor);
  rect(2*width/4, 500, btnWidth, btnHeight);
  fill(btnTextColor);
  drawText(option2, 2*width/4, 500);
  
  // button 3
  fill(btnColor);
  rect(3*width/4, 500, btnWidth, btnHeight);
  fill(btnTextColor);
  drawText(option3, 3*width/4, 500);
}

void clearScreen() {
  background(230, 233, 235);
}
