var ques1; // answers can be 0-3
var ques2;
var ques3;
var ques4;

var question1 = "Where do you find yourself when you want to relax?"; // questions to ask the user in order to personalize their experience
var question2 = "What’s the most relaxing color to you?";
var question3 = "Favorite season or time of day?";
var question4 = "What visual (out of 3) is the most pleasing to you?";

var overBtn0 = false; // button variables, 3 options
var overBtn1 = false;
var overBtn2 = false;

var btnColor;
var btnHoverColor;
var btnTextColor;
var btnWidth = 450;
var btnHeight = 500;

var firstColor;
var secondColor;
var thirdColor;
var backgroundColor;

var scene; // 0-3 are questions, 4 is the visualization?

var noiseScale = 500; // Particle Variables
var numParticles = 200;
var particles_a = [];
var particles_b = [];
var particles_c = [];

// color variables
var themes = [];
    
function setup() {
  // --- setup the app window ---
  createCanvas(1920, 1080);
  background(230, 233, 235);
  
  // setup themes colors(lightest = 0, darkest = 2)
  themes = [
    {name: "Red", colors: ["#FF7933", "#FF4941", "#E82E6B"], background: "#E6E9EB"},
    {name: "Blue", colors: ["#1AE8E5", "#29C9FF", "#1A7EE8"], background: "#E6E9EB"},
    {name: "Yellow", colors: ["#FFEC19", "#FFC226", "#FF8919"], background: "#E6E9EB"}
  ];
  
  // --- setup the question and scene variables ---
  ques1 = -1;
  ques2 = -1;
  ques3 = -1;
  ques4 = -1;
  scene = 0;
  
  // --- text settings ---
  textFont('DM Sans');
  // --- button settings ---
  btnColor = color(132,164,246);
  btnHoverColor = color(192,209,252);
  btnTextColor = color(240,245,249);
  
  // --- particle settings/create particles ---
  for(var i = 0; i < numParticles; i++){
    particles_a[i] = new Particle(random(0, width),random(0,height));
    particles_b[i] = new Particle(random(0, width),random(0,height));
    particles_c[i] = new Particle(random(0, width),random(0,height));
  }
}

function draw() {
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
      text(question1, 150, 150);
      textSize(40);
      drawButtons("In Nature", "At Home", "With Friends");
      break;
    case 1: // Question 2
      clearScreen();
      textAlign(LEFT);
      textSize(48);
      text(question2, 150, 150);
      textSize(40);
      drawButtons("Red", "Blue", "Yellow");
      break;
    case 2: // Question 3
      clearScreen();
      textAlign(LEFT);
      textSize(48);
      text(question3, 150, 150);
      textSize(40);
      drawButtons("Morning", "Afternoon", "Evening");
      break;
    case 3: // Question 3
      clearScreen();
      textAlign(LEFT);
      textSize(48);
      text(question4, 150, 150);
      textSize(40);
      drawButtons("#1", "#2", "#3");
      break;
    case 4: // Visualization
      // prints the question answers/hash to the visualization screen
      var answers = ques1 + " " + ques2 + " " + ques3 + " " + ques4;
      textSize(20);
      text(answers, 50, 50); 
      // -- TODO: check answers here and create settings/play the corresponding visualization
      perlinNoise();
      break;
  }
}
