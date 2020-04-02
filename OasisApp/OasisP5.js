// Networking
var serial; // variable to hold an instance of the serialport library
var portName = "/dev/tty.usbmodem14201"; // fill in your serial port name here
var inData; // variable to hold the input data from Arduino
var outData = 0; // variable to hold the output data to Arduino

let actualVal;

var ques1; // answers can be 0-3
var ques2;
var ques3;
var ques4;

let color1;
let color2;
let color3;
let color4;

var firstColor;
var secondColor;
var thirdColor;
var fourthColor;
var backgroundColor;

var NOISE_SCALE = 0.003;
var STEP = 20;
var count;
var scene; // 0 is the launch screen, 1-4 are questions, 5 is the tutorial and 6 is the visualization

// var noiseScale = 500; // Particle Variables
// var numParticles = 200;
// var particles_a = [];
// var particles_b = [];
// var particles_c = [];

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
var scenes = [];
var personalities = [];

// Home Scene Setup
let squareArr = [];

function preload() {
  // load images
  launchBackgroundImg = loadImage("media/launch-background-image.png");
  launchExtrasImg = loadImage("media/launch-extras.png");
}

function setup() {
  // --- setup the app window ---
  createCanvas(windowWidth, windowHeight);
  // Set the global stylings, color, theme, scene
  setupGlobalStyling();
  background("#E8EDF4");
  // Home Scene Setup
  homeSettings();

  // Establish connection with the arduino
  setupArduinoConnection();
  // Scene Type
  // --- text settings ---
  textFont("DM Sans");

  // --- particle settings/create particles ---
  // for (var i = 0; i < numParticles; i++) {
  //   particles_a[i] = new Particle(random(0, width), random(0, height));
  //   particles_b[i] = new Particle(random(0, width), random(0, height));
  //   particles_c[i] = new Particle(random(0, width), random(0, height));
  // }
}
let lowendStorage = JSON.parse(localStorage.getItem("lowend"));
let highendStorage = JSON.parse(localStorage.getItem("highend"));
console.log("lowend: " + lowendStorage);
console.log("highend: " + highendStorage);
function draw() {
  // drawing settings for every frame (don't change?)
  noStroke();
  fill(132, 164, 246, 255);
  // Convert the real data to usable data

  actualVal = map(inData, lowendStorage, highendStorage, 0, 500, true);

  // Select which one to draw
  switch (ques1) {
    case 0: // Forest Visual
      // perlinNoise();
      console.log("Forest Visual");
      break;
    case 1: // Beach Visual
      console.log("Beach Visual");
      break;
    case 2: // Home Visual
      homeVisual();
      console.log("Home Visual");
      break;
  }
}

///////////////////////////////////////
// Code for the Home Visual////////////
///////////////////////////////////////
// let counter = 0;
function homeVisual() {
  push();
  fill(255, 0);
  rect(0, 0, width, height);
  pop();

  var phase = frameCount / 2;

  perlinArr.forEach(curve => {
    curve.update(phase);
    curve.print();
  });
}

///////////////////////////////////////
// Code for the Beach Visual////////////
///////////////////////////////////////
function beachVisual() {
  background(255);
  textSize(32);
  text(actualVal, 200, 200);

  // console.log(inData);
} ///////////////////////////////////////
// Code for the Forest Visual////////////
///////////////////////////////////////
function forestVisual() {
  background(255);
  textSize(32);
  text(actualVal, 200, 200);

  // console.log(inData);
}
/*
References for these codes:
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
*/

// Following functions print the serial communication status to the console for debugging purposes

function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print("connected to server.");
}

function portOpen() {
  print("the serial port opened.");
}

function serialEvent() {
  // inData = Number(serial.read());
  inData = serial.readStringUntil("\n");
  // inData = serial.readString();
}

function serialError(err) {
  print("Something went wrong with the serial port. " + err);
}

function portClose() {
  print("The serial port closed.");
}

function setupGlobalStyling() {
  // Set scene
  scenes = [
    {
      name: "Forest"
    },
    {
      name: "Beach"
    },
    {
      name: "Home"
    }
  ];
  // Setup themes colors(lightest = 0, darkest = 2)
  themes = [
    {
      name: "Water",
      colors: ["#C2E7F3", "#4DB4DB", "#0555A7", "#001351"],
      background: "#E8EDF4"
    },
    {
      name: "Fire",
      colors: ["#FF9D00", "#FE6701", "#FF2700", "#840018"],
      background: "#6879B4"
    },
    {
      name: "Earth",
      colors: ["#A1CBC8", "#53C2BA", "#206863", "#206863"],
      background: "#E8EDF4"
    }
  ];
  // Set Personality
  personalities = [
    {
      name: "Introverted"
    },
    {
      name: "Extroverted"
    },
    {
      name: "Ambiverted"
    }
  ];
  // --- setup the question and scene variables ---
  let answers = JSON.parse(localStorage.getItem("answers")); // <---- USER'S ANSWERS
  ques1 = answers[0];
  ques2 = answers[1];
  ques3 = answers[2];

  // DEBUG SAVED ANSWERS

  // Set Scene Settings Based on Quiz Answers
  // Set Scene
  scene = scenes[ques1].name;
  // Color Palette
  color1 = themes[ques2].colors[0];
  color2 = themes[ques2].colors[1];
  color3 = themes[ques2].colors[2];
  color4 = themes[ques2].colors[3];

  backgroundColor = themes[ques2].background;
  // Set Third Question
  personalityType = personalities[ques3].name;
}

function setupArduinoConnection() {
  //set up communication port
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on("list", printList); // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen); // callback for the port opening
  serial.on("data", serialEvent); // callback for when new data arrives
  serial.on("error", serialError); // callback for errors
  serial.on("close", portClose); // callback for the port closing
  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

let perlinArr = [];
function homeSettings() {
  strokeWeight(0.5);
  noFill();
  count = round((width * 1.5) / STEP);
  background(255);

  for (let i = 0; i < 20; i++) {
    perlinArr.push(new drawPerlinCurve(0, 0, 0, 0, 0, 0, 0));
  }
}

function drawGrid() {
  for (var i = 0; i < windowWidth + 20; i += 20) {
    // draw one line of 20 rectangles across the x-axis
    for (var j = 0; j < windowHeight + 20; j += 20) {
      // var lightBlue = color(30, 139, 195);

      noFill();
      stroke(255);
      strokeWeight(0.1);
      rect(i, j, 20, 20);
    }
  }
}

class drawPerlinCurve {
  constructor(xx, yy, phase1, step1, count1, myColour1, actualVal1) {
    this.x = xx;
    this.y = yy;
    this.phase = phase1;
    this.step = step1;
    this.count = count1;
    this.myColour = myColour1;
    this.actualVal = actualVal1;

    switch (floor(random(0, 4))) {
      case 0:
        this.myColour = color1;
        break;
      case 1:
        this.myColour = color2;
        break;
      case 2:
        this.myColour = color3;
        break;
      case 3:
        this.myColour = color4;
        break;
    }
    this.myColour = lerpColor(
      color(this.myColour),
      color(color1),
      this.yy / height
    );
  }

  update(phase2) {
    this.phase = phase2;
    for (var y = 0; y < height; y += 10) {
      this.yy = y;
    }
  }
  print() {
    push();
    noFill();
    stroke(this.myColour);
    beginShape();
    for (var i = 0; i < this.count; i++) {
      curveVertex(this.x, this.y);
      var angle =
        2 *
        PI *
        noise(
          this.x * NOISE_SCALE,
          this.y * NOISE_SCALE,
          this.phase * NOISE_SCALE
        );
      ellipse(this.x, this.y, this.step, this.step);
      this.x += cos(angle) * this.step;
      this.y += sin(angle) * this.step;
    }
    endShape();
    pop();
  }
}
