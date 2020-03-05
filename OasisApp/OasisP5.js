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
  answers = JSON.parse(localStorage.getItem("answers")); // <---- USER'S ANSWERS
  ques1 = answers[0];
  ques2 = answers[1];
  ques3 = answers[2];
  scene = 0;

  // DEBUG SAVED ANSWERS
  console.log(answers);

  // set color palette here 
  firstColor = themes[ques2].colors[0];
  secondColor = themes[ques2].colors[1];
  thirdColor = themes[ques2].colors[2];
  backgroundColor = themes[ques2].background;

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
    case 0: // Tutorial/Visual here
      perlinNoise();
      break;
  }
}