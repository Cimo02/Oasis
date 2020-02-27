var ques1; // answers can be 0-3
var ques2;
var ques3;
var ques4;

var firstColor;
var secondColor;
var thirdColor;
var backgroundColor;

var scene; // 0 is the launch screen, 1-4 are questions, 5 is the tutorial and 6 is the visualization

var noiseScale = 500; // Particle Variables
var numParticles = 200;
var particles_a = [];
var particles_b = [];
var particles_c = [];

// images
let launchBackgroundImg;
let launchExtrasImg;

// buttons
var beginButton; // "start" on the launch screen
var option1Button; // options for questions that get reused for all four screens 
var option2Button; 
var option3Button;

// color variables
var themes = [];
   
var firstRun;

function preload() {
  // load images
  launchBackgroundImg = loadImage('media/launch-background-image.png');
  launchExtrasImg = loadImage('media/launch-extras.png');
}

function setup() {
  // --- setup the app window ---
  createCanvas(1920, 1080);
  background("#E8EDF4");
  
  // setup themes colors(lightest = 0, darkest = 2)
  themes = [
    {name: "Serenity", colors: ["#C0D1FC", "#84A4F6", "#304FA1"], background: "#E8EDF4"},
    {name: "Aura", colors: ["#EEAC9E", "#EE7156", "#993A26"], background: "#E8EDF4"},
    {name: "Mystical", colors: ["#A1CBC8", "#53C2BA", "#206863"], background: "#E8EDF4"}
  ];
  
  // --- setup the question and scene variables ---
  ques1 = -1;
  ques2 = -1;
  ques3 = -1;
  ques4 = -1;
  scene = 0;
  firstRun = true;
  
  // --- text settings ---
  textFont('DM Sans');
  
  // --- particle settings/create particles ---
  for(var i = 0; i < numParticles; i++){
    particles_a[i] = new Particle(random(0, width),random(0,height));
    particles_b[i] = new Particle(random(0, width),random(0,height));
    particles_c[i] = new Particle(random(0, width),random(0,height));
  }
}

function draw() {
  // drawing settings for every frame (don't change?)
  noStroke();
  fill(132,164,246,255);
  
  // drawing(gameplay) loop
  switch(scene){
    case 0: // Launch Screen
      if (firstRun) {
        drawLaunchScreen();
      }
      break;
    case 1: // Question 1
      if (firstRun) {
        clearScreen();
        drawQuestionScreen("Where are \nyou most \nrelaxed?", "The Forest", "The Beach", "At Home");
      }
      break;
    case 2: // Question 2
      if (firstRun) {
        clearScreen();
        drawQuestionScreen("Choose an \nelement.", "Water", "Fire", "Earth");
      }
      break;
    case 3: // Question 3
      if (firstRun) {
        clearScreen();
        drawQuestionScreen("How would \nyou \ndescribe \nyour flow?", "Sporadic", "Controlled", "Free Flowing");
      }
      break;
    case 4: // Question 4
      if (firstRun) {
        clearScreen();
        drawQuestionScreen("Choose a \npalette.", "Serenity", "Aura", "Mystical");
      }
      break;
    case 5: // Tutorial (put on belt, etc.)
      // prints the question answers/hash to the visualization screen
      var answers = ques1 + " " + ques2 + " " + ques3 + " " + ques4;
      textSize(20);
      fill("#939393");
      text(answers, 50, 50); 
      // -- TODO: check answers here and create settings/play the corresponding visualization
      perlinNoise();
      break;
    case 6: // Visualization
      // -- TODO: check answers here and create settings/play the corresponding visualization
      perlinNoise();
      break;
  }
}
