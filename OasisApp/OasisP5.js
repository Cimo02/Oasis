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
function homeVisual() {
  rectMode(CENTER);
  background(backgroundColor);
  textSize(32);
  text(actualVal, 200, 200);

  for (let i = 0; i < squareArr.length; i++) {
    squareArr[i].update(actualVal);
    squareArr[i].draw();
  }
  fill(color1);
  rect(50, 50, 50, 50);
  fill(color2);
  rect(100, 50, 50, 50);
  fill(color3);
  rect(150, 50, 50, 50);
  fill(color4);
  rect(200, 50, 50, 50);
  // console.log(inData);
}

class square {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;
    this.c = c;
    console.log(this.c);
  }

  update(val) {
    this.w = val;
    this.h = val;
  }

  draw() {
    fill(color(this.c));
    rect(this.x, this.y, this.w, this.h);
  }
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

function homeSettings() {
  let randColor;
  for (let i = 0; i < 50; i++) {
    switch (Math.floor(random(0, 5))) {
      case 1:
        randColor = color1;
        break;
      case 2:
        randColor = color2;
        break;
      case 3:
        randColor = color3;
        break;
      case 4:
        randColor = color4;
        break;
      default:
        randColor = color1;
        break;
    }
    console.log(randColor);
    squareArr.push(new square(random(0, width), random(0, height), randColor));
  }
}

function drawGrid() {
  for (let i = 0; i < width / 10; i++) {}
  line(x + 10 * i, y1, x2, y2);
}
