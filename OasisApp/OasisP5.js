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

// set simulation to always true for ease of use for the devs
var isSimulation = true;

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
let perlinArr = [];

// Forest Scene Setup
var tree; //a graphics buffer to draw the tree into
var paths = []; //an array for all the growing branches

function preload() {
  // load images
  launchBackgroundImg = loadImage("media/launch-background-image.png");
  launchExtrasImg = loadImage("media/launch-extras.png");

  isSimulation = JSON.parse(localStorage.getItem("simulated"));
  print("simulated: " + isSimulation);
}

function setup() {
  // --- setup the app window ---
  createCanvas(windowWidth, windowHeight);
  // Set the global stylings, color, theme, scene
  setupGlobalStyling();
  background("#E8EDF4");

  // Select Scene to setup
  switch (ques1) {
    case 0: // Forest Visual
      forestSettings();
      break;
    case 1: // Beach Visual
      break;
    case 2: // Home Visual
      homeSettings();
      break;
  }

  // Establish connection with the arduino
  if (isSimulation) {
    actualVal = 50;
    rising = true;
  } else {
    setupArduinoConnection();
  }

  // Scene Type
  // --- text settings ---
  textFont("DM Sans");
}

let lowendStorage = JSON.parse(localStorage.getItem("lowend"));
let highendStorage = JSON.parse(localStorage.getItem("highend"));
//console.log("lowend: " + lowendStorage);
//console.log("highend: " + highendStorage);

function draw() {
  // drawing settings for every frame (don't change?)
  noStroke();
  fill(132, 164, 246, 255);
  // Convert the real data to usable data
  if (isSimulation) {
    simulate();
  } else {
    // don't map "actualVal" unless we're using real data
    actualVal = map(inData, lowendStorage, highendStorage, 0, 500, true);
  }
  print("value: " + actualVal); //debug breathing value

  // Select which one to draw
  switch (ques1) {
    case 0: // Forest Visual
      forestVisual(actualVal);
      // console.log("Forest Visual");
      break;
    case 1: // Beach Visual
      beachVisual();
      // console.log("Beach Visual");
      break;
    case 2: // Home Visual
      homeVisual(actualVal);
      // console.log("Home Visual");
      break;
  }

  // forestVisual(actualVal);
}

///////////////////////////////////////
// Code for the Home Visual////////////
///////////////////////////////////////
let ballArr = [];

function homeVisual(val) {
  for (i = 0; i < ballArr.length; i++) {
    ballArr[i].update(val);
    ballArr[i].setInc();
    ballArr[i].draw();
  }
}

///////////////////////////////////////
// Code for the Beach Visual////////////
///////////////////////////////////////
function beachVisual() {
  background(255);
  // textSize(32);
  // text(actualVal, 200, 200);

  // console.log(inData);
}

///////////////////////////////////////
// Code for the Forest Visual////////////
///////////////////////////////////////
function forestVisual(val) {
  image(tree, 0, 0, width, height); //here we draw the tree to the screen every frame

  tree.noStroke(); //tree has no stroke

  let c1 = color(color1);
  let c4 = color(color4);

  for (var i = 0; i < paths.length; i++) {
    //start drawing the tree by going thru all the branches
    var loc = paths[i].location.copy(); //grab a copy of their location
    var diam = paths[i].diameter; //grab a copy of the branch diameter
    tree.fill(lerpColor(c4, c1, actualVal / 500)); //color of the tree
    tree.ellipse(loc.x, loc.y, diam, diam); //here we draw the next ellipse for each branch into the tree buffer
    paths[i].update(); //update the position and direction for the growth of each branch
  }
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
      name: "Forest",
      type: 1,
    },
    {
      name: "Beach",
      type: 2,
    },
    {
      name: "Home",
      type: 3,
    },
  ];
  // Setup themes colors(lightest = 0, darkest = 2)
  themes = [
    {
      name: "Water",
      colors: ["#C2E7F3", "#4DB4DB", "#0555A7", "#001351"],
      background: "#E8EDF4",
    },
    {
      name: "Fire",
      colors: ["#FF9D00", "#FE6701", "#FF2700", "#840018"],
      background: "#6879B4",
    },
    {
      name: "Earth",
      colors: ["#EDFFE9", "#AFC66D", "#27522B", "#0F2319"],
      background: "#202330",
    },
  ];
  // Set Personality
  personalities = [
    {
      name: "Introverted",
      type: 1,
    },
    {
      name: "Extroverted",
      type: 2,
    },
    {
      name: "Ambiverted",
      type: 3,
    },
  ];
  // --- setup the question and scene variables ---
  let answers = JSON.parse(localStorage.getItem("answers")); // <---- USER'S ANSWERS
  ques1 = answers[0];
  ques2 = answers[1];
  ques3 = answers[2];

  // DEBUG SAVED ANSWERS

  // Set Scene Settings Based on Quiz Answers
  // Set Scene
  // console.log("scene name: " + scenes[ques1].name);
  scene = scenes[1].name;

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

var rising; //is actualVal increasing or decreasing?
function simulate() {
  if (actualVal < 50 || actualVal > 450) {
    rising = !rising;
  }

  if (rising) {
    actualVal++;
  } else {
    actualVal--;
  }
}

// HOME VISUAL
function homeSettings() {
  noStroke();
  for (i = 0; i < 20; i++) {
    ballArr.push(new fallParticle(width / 2, height / 2, random(1, 20), i));
  }
}

class fallParticle {
  constructor(x, y, size, id) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.inc = random(0.01, 1);
    this.id = id;
    this.nx = 0;
    this.ny = 0;
    this.xOff = random(100);
    this.yOff = random(100);
    this.val;
  }

  update(val) {
    this.xOff += 0.00003 * this.size;
    this.yOff += 0.00005 * this.size;
    this.nx = noise(this.xOff) * width;
    this.ny = noise(this.yOff) * height;
    this.x = this.nx;
    this.y = this.ny;
    this.y += this.inc;
    this.x += this.inc;
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
  }
  setInc() {
    this.val = actualVal;
  }
  draw() {
    push();
    if (this.id % 3 == 0) {
      fill(color1);
    } else if (this.id % 2 == 0) {
      fill(color2);
    } else if (this.id % 5 == 0) {
      fill(color3);
    } else {
      fill(color4);
    }
    // this.size = actualVal;
    ellipse(this.x, this.y, this.val / 70, this.val / 70);
    pop();
  }
}

// FOREST VISUAL
function forestSettings() {
  frameRate(30); // how fast the tree is growing
  tree = createGraphics(windowWidth, windowHeight); //decide how big the image is to hold the tree drawing
  ellipseMode(CENTER);
  smooth();
  fill(color4);
  paths.push(new Pathfinder(undefined, 1, 0));
  paths.push(new Pathfinder(undefined, -1, windowWidth));
}

function Pathfinder(parent, direction = 0, xVal = 0) {
  //the class for making branches - note that it allows for another branch object to be passed in...
  if (parent === undefined) {
    //if this is the first branch, then use the following settings - note that this is how you deal with different constructors
    this.location = createVector(xVal, windowHeight / 2); //placemnet of the first branch, or trunk
    this.velocity = createVector(direction, 0); //direction for the trunk, here 1 in the x axis = left
    this.diameter = 55; //size of trunk
  } else {
    this.location = parent.location.copy(); //for a new branch, copy in the last position, the end of the branch
    this.velocity = parent.velocity.copy(); //for a new branch, copy the direction the old branch was going
    var area = PI * sq(parent.diameter / 2); //find the area of the branch cross section
    var newDiam = sqrt(area / 2 / PI) * 2; //divide it by two and calculate the diameter of this new branch
    this.diameter = newDiam; //save the new diameter
    parent.diameter = newDiam; //the parent branch keeps on growing, but with the new diameter as well
  }

  this.update = function () {
    //update the growth of the tree
    if (this.diameter > 2) {
      //this indicates when the tree should stop growing, the smallest branch diameter
      this.location.add(this.velocity); //update the location of the end of the branch
      //this determines how straight or curly the growth is, here it is +-13% variation
      var bump = new createVector(random(-0.87, 0.87), random(-0.87, 0.87));
      bump.mult(0.1); //this reduces that by ten so now it is +-1.3% variation
      this.velocity.add(bump); //apply that to the velocity for the next growth
      this.velocity.normalize(); //make sure our vector is normalized to be between 0-1
      if (random(0, 1) < 0.01) {
        //this is the probability that the tree splits, here it is 1% chance
        paths.push(new Pathfinder(this)); //if it is time for a split, make a new path
      }
    }
  };
}
