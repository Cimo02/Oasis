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
// console.log("lowend: " + lowendStorage);
// console.log("highend: " + highendStorage);

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
      homeVisual(actualVal);
      console.log("Home Visual");
      break;
  }
}

///////////////////////////////////////
// Code for the Home Visual////////////
///////////////////////////////////////
// let counter = 0;
let ballArr = [];

function homeVisual(val) {
  // rect(0, 0, val, val);

  // console.log(val);
  // // push();
  // // fill(255, 5);
  // // rect(0, 0, width, height);
  // // pop();

  for (i = 0; i < ballArr.length; i++) {
    ballArr[i].update(val);
    ballArr[i].draw();
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
  noStroke();
  for (i = 0; i < width / 2; i++) {
    ballArr.push(
      new fallParticle(random(0, width), random(0, height), random(1, 20), i)
    );
  }
}

class fallParticle {
  constructor(x, y, size, id) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.inc = random(0.1, 1);
    this.id = id;
    this.nx = 0;
    this.ny = 0;
    this.xOff = random(500);
    this.yOff = random(500);
  }

  update(val) {
    // this.nx = noise(xOff * this.size + this.id);
    // this.ny = noise(yOff * this.size + this.id);
    // if (this.id % 20 == 0) {
    // console.log(val);
    // }

    this.xOff += 0.0003 * (this.size / 10);
    this.yOff += 0.0005 * (this.size / 10);
    this.nx = noise(this.xOff) * width;
    this.ny = noise(this.yOff) * height;
    this.x = this.nx;
    this.y = this.ny;
    this.y += this.inc;
    this.x += this.inc;

    // this.x = this.y / this.inc / 2 + this.id;
    if (this.y > height + 20) {
      this.y = 0;
      this.x = random(0, width);
      this.size = random(1, 20);
    }
    if (this.x > width + 20) {
      this.y = 0;
      this.x = random(0, width);
      this.size = random(1, 20);
    }

    // this.x += this.nx;
    // this.y += this.ny;
    // console.log(val);
    // this.x += constrain(this.nx, 0, 100);
    // this.y += constrain(this.ny, 0, 100);
  }

  draw() {
    push();
    if (this.id % 3 == 0) {
      fill(255, 157, 0, 100);
    } else if (this.id % 2 == 0) {
      fill(254, 103, 1, 100);
    } else if (this.id % 5 == 0) {
      fill(255, 39, 0, 100);
    } else {
      fill(132, 0, 24, 100);
    }
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }
}
