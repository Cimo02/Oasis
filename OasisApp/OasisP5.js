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

let pictureTaken = false;

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
var paths = []; //an array for all the growing branches

function preload() {
  // load images
  launchBackgroundImg = loadImage("media/launch-background-image.png");
  launchExtrasImg = loadImage("media/launch-extras.png");

  // Turned off belt check cause its not being used
  // isSimulation = JSON.parse(localStorage.getItem("simulated"));
  print("simulated: " + isSimulation);
}

let cnv;
function setup() {
  // --- setup the app window ---
  cnv = createCanvas(windowWidth, windowHeight);
  // Set the global stylings, color, theme, scene
  setupGlobalStyling();
  background("#E8EDF4");

  // Select Scene to setup
  switch (ques1) {
    case 0: // Forest Visual
      forestSettings();
      break;
    case 1: // Beach Visual
      beachSettings();
      break;
    case 2: // Home Visual
      homeSettings();
      break;
  }

  // Establish connection with the arduino
  if (isSimulation) {
    actualVal = 50;
    state = states[0];
  } else {
    // setupArduinoConnection();
  }

  // Scene Type
  // --- text settings ---
  textFont("DM Sans");
}

let lowendStorage = JSON.parse(localStorage.getItem("lowend"));
let highendStorage = JSON.parse(localStorage.getItem("highend"));

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
  //console.log(actualVal); //debug breathing value

  // Select which one to draw

  if (personalityType == "Introverted") {
    // tint(0, 25, 0);
    tint(50);
    // console.log("TINT: INTRO");
  } else if (personalityType == "Extroverted") {
    // tint(0, 255, 0);
    tint(150);
    // console.log("TINT: EXTRA");
  } else if (personalityType == "Ambiverted") {
    // tint(0, 150, 0);
    tint(255);
    // console.log("TINT: AMBI");
  }

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

  // Save generated art once the timer finished
  if (timerHasFinished && !isMobile && !pictureTaken) {
    saveCanvas(cnv, "Oasis", "png");
    pictureTaken = true;
    // console.log("Finished Timer");
  }

  if (timerExhaleEnded) {
    //console.log("Exhale Ended");
    timerExhaleEnded = false;
  }
  if (timerHoldEnded) {
    //console.log("Hold Ended");
    timerHoldEnded = false;
  }
  if (timerInhaleEnded) {
    //console.log("Inhale Ended");
    timerInhaleEnded = false;
  }
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
let angle = 0;
let time = 0;
function beachVisual() {
  // background(255);

  if (time < 10) {
    fill(232, 237, 243);
    rect(0, 0, width, height);
  }

  // if (time % 2 == 0) {
  //   fill(232, 237, 243, 10);
  //   rect(0, 0, width, height);
  // }
  // fill(232, 237, 243, 30);
  // rect(0, 0, width, height);
  // background(232, 237, 243, 30);
  for (i = 0; i < rainArr.length; i++) {
    rainArr[i].setInc();
    rainArr[i].update();
    rainArr[i].draw();

    if (rainArr[i].dead()) {
      // ballArr.splice(i, 1);
      rainArr[i].resetExistence();
    }
  }

  angle += 0.02;
  time += 1;
}

///////////////////////////////////////
// Code for the Forest Visual////////////
///////////////////////////////////////
function forestVisual(val) {
  noStroke(); //tree has no stroke

  let c1 = color(color1);
  let c4 = color(color4);
  let theme = themes[ques2].name;
  if (personalityType == "Introverted") {
    if (theme == "Water") {
      c1 = color("#008CE2");
      c4 = color("#DAE7F2");
    } else if (theme == "Fire") {
      c1 = color("#CC2C33");
      c4 = color("#E8D4C0");
    } else if (theme == "Earth") {
      c1 = color("#25392E");
      c4 = color("#C9DCC8");
    }
  } else if (personalityType == "Extroverted") {
    if (theme == "Water") {
      c1 = color("#1B51CC");
      c4 = color("#6AB5E6");
      // console.log("extra water");
    } else if (theme == "Fire") {
      c1 = color("#E4131C");
      c4 = color("#F08A03");
      // console.log("extra fire");
    } else if (theme == "Earth") {
      c1 = color("#2D7B35");
      c4 = color("#C3F3A2");
      // console.log("extra earth");
    }
  } else if (personalityType == "Ambiverted") {
    if (theme == "Water") {
      c1 = color("#263D71");
      c4 = color("#ACCFE1");
    } else if (theme == "Fire") {
      c1 = color("#93110C");
      c4 = color("#F4CF9D");
    } else if (theme == "Earth") {
      c1 = color("#305135");
      c4 = color("#D3EAC3");
    }
  }
  console.log(themes[ques2].name);
  // c1.setAlpha(50);
  // c4.setAlpha(50);

  for (var i = 0; i < paths.length; i++) {
    //start drawing the tree by going thru all the branches
    var loc = paths[i].location.copy(); //grab a copy of their location
    var diam = paths[i].diameter; //grab a copy of the branch diameter
    push();
    // blendMode(BURN);
    fill(lerpColor(c4, c1, actualVal / 500)); //color of the tree
    ellipse(loc.x, loc.y, diam, diam); //here we draw the next ellipse for each branch into the tree buffer
    pop();
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
      name: "Extroverted",
      type: 1,
    },
    {
      name: "Ambiverted",
      type: 2,
    },
    {
      name: "Introverted",
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
  // console.log(personalityType);
  personalityNum = personalities[ques3].type;
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

var state; // What state is the timer in?
let states = ["inhale", "hold", "exhale"];
let INHALE_INCR = 1.6667; //400/240
let EXHALE_INCR = 1.25; //400/320
function simulate() {
  if (timerInhaleEnded) {
    state = states[1];
  } else if (timerHoldEnded) {
    state = states[2];
  } else if (timerExhaleEnded) {
    state = states[0];
  }

  switch (state) {
    case "inhale": // runs for ~120 frames
      if (actualVal > 450) {
        break;
      } //lock val if it goes over maximum
      actualVal = actualVal + INHALE_INCR;
      break;
    case "hold":
      // value should be 450 (max) for hold
      break;
    case "exhale": // runs for ~160 frames
      if (actualVal < 50) {
        break;
      } //lock val if it drops below minimum
      actualVal = actualVal - EXHALE_INCR;
      break;
  }
}

// HOME VISUAL
function homeSettings() {
  noStroke();
  // 1920/10
  // while i is less then width
  frameRate(60);
  for (i = 0; i < 40; i++) {
    ballArr.push(
      new fallParticle(
        random(-400, width),
        random(-400, height),
        random(1, 20),
        i
      )
    );
  }
}

class fallParticle {
  constructor(x, y, size, id) {
    this.x = x;
    this.y = y;
    this.size = random(size * 2);
    this.inc = random(0.01, 1);
    this.id = id;
    this.nx = 0;
    this.ny = 0;
    this.xOff = random(100);
    this.yOff = random(100);
    this.val;

    this.color;
    this.opac = 50;
  }

  update(val) {
    var breathVal = map(actualVal, 0, 450, 0, 100);
    // add breath val to someting to do with motion
    this.xOff += 0.00003 * this.size;
    this.yOff += 0.00005 * this.size;

    this.nx = noise(this.xOff) * (width * 2.1);
    this.ny = noise(this.yOff) * (height * 2.1);

    this.x = this.nx;
    this.y = this.ny;
    this.x -= width / 2;
    this.y -= height / 2;
  }
  setInc() {
    this.val = actualVal;
  }
  draw() {
    push();
    // blendMode(EXCLUSION);

    // new color code
    let c1 = color(color1);
    let c4 = color(color4);
    let theme = themes[ques2].name;
    if (personalityType == "Introverted") {
      if (theme == "Water") {
        c1 = color("#008CE2");
        c4 = color("#DAE7F2");
      } else if (theme == "Fire") {
        c1 = color("#CC2C33");
        c4 = color("#E8D4C0");
      } else if (theme == "Earth") {
        c1 = color("#25392E");
        c4 = color("#C9DCC8");
      }
    } else if (personalityType == "Extroverted") {
      if (theme == "Water") {
        c1 = color("#1B51CC");
        c4 = color("#6AB5E6");
        // console.log("extra water");
      } else if (theme == "Fire") {
        c1 = color("#E4131C");
        c4 = color("#F08A03");
        // console.log("extra fire");
      } else if (theme == "Earth") {
        c1 = color("#2D7B35");
        c4 = color("#C3F3A2");
        // console.log("extra earth");
      }
    } else if (personalityType == "Ambiverted") {
      if (theme == "Water") {
        c1 = color("#263D71");
        c4 = color("#ACCFE1");
      } else if (theme == "Fire") {
        c1 = color("#93110C");
        c4 = color("#F4CF9D");
      } else if (theme == "Earth") {
        c1 = color("#305135");
        c4 = color("#D3EAC3");
      }
    }
    // new color code

    // settings two variables to the  new colors then applying them "randomly"
    if (this.id % 3 == 0) {
      this.color = c1;
      this.color.setAlpha(this.opac);
    } else if (this.id % 2 == 0) {
      this.color = color(color2);
      this.color.setAlpha(this.opac);
    } else if (this.id % 5 == 0) {
      this.color = color(color3);
      this.color.setAlpha(this.opac);
    } else {
      this.color = c4;
      this.color.setAlpha(this.opac);
    }

    fill(this.color);
    // this.size = actualVal;
    this.y == 0
      ? null
      : ellipse(
          this.x,
          this.y,
          this.val / 60 + this.size / 4,
          this.val / 60 + this.size / 4
        );

    pop();
  }
}
let rainArr = [];
let slide;

let img;
// Beach Visual Seetings

function beachSettings() {
  // slide = createSlider(0, 500, 250, 1);

  ellipseMode(CENTER);
  background(255);
  frameRate(60);
  noStroke();
  for (i = 0; i < 200; i++) {
    rainArr.push(
      new rainParticle(
        random(-200, width),
        random(-200, height),
        random(10, 30),
        i
      )
    );
  }
}

// FOREST VISUAL
function forestSettings() {
  frameRate(60);
  ellipseMode(CENTER);
  smooth();
  fill(color4);
  paths.push(new TreeBranch(undefined, 1, -100, random(windowHeight)));
  paths.push(
    new TreeBranch(undefined, -1, windowWidth + 100, random(windowHeight))
  );
}

function TreeBranch(parent, direction, xVal, yVal) {
  //the class for making branches - note that it allows for another branch object to be passed in...
  if (parent === undefined) {
    //if this is the first branch, then use the following settings - note that this is how you deal with different constructors
    this.location = createVector(xVal, yVal); //placemnet of the first branch, or trunk
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

      var adjustedVel = this.velocity.mult(actualVal / 450 + 0.25);
      if (state == "hold") {
        adjustedVel = this.velocity.mult(0.25);
        // as breathing goes up value tends towards 0.
      }
      this.location.add(adjustedVel); //update the location of the end of the branch
      // console.log(adjustedVel); // debug calculated velocity

      //this determines how straight or curly the growth is, here it is +-13% variation
      var bump = new createVector(random(-0.87, 0.87), random(-0.87, 0.87));
      bump.mult(actualVal / 2400);
      //bump.mult(0.1); //this reduces that by ten so now it is +-1.3% variation
      this.velocity.add(bump); //apply that to the velocity for the next growth
      this.velocity.normalize(); //make sure our vector is normalized to be between 0-1

      if (random(0, 1) < 0.004) {
        //this is the probability that the tree splits, here it is 0.4% chance
        paths.push(new TreeBranch(this)); //if it is time for a split, make a new path
      }
    }
  };
}

class rainParticle {
  constructor(x, y, size, id) {
    this.xOff = random(0, 5);
    this.x = x;
    this.y = y;
    this.size = size;
    this.id = id;
    this.inc = random(0.2, 1);
    this.isDead = false;
    this.yLimit = random(10, 200);
    this.limitCounter = 0;
    this.randSize = floor(random(1, 6));
    this.sizes = [];
    this.n = 0;
    this.rotation = random(360);
    this.color;
    this.opac = random(0, 100);

    this.randBreathStop = random(450, 490);

    // new color code
    let c1 = color(color1);
    let c4 = color(color4);
    let theme = themes[ques2].name;
    if (personalityType == "Introverted") {
      if (theme == "Water") {
        c1 = color("#008CE2");
        c4 = color("#DAE7F2");
      } else if (theme == "Fire") {
        c1 = color("#CC2C33");
        c4 = color("#E8D4C0");
      } else if (theme == "Earth") {
        c1 = color("#25392E");
        c4 = color("#C9DCC8");
      }
    } else if (personalityType == "Extroverted") {
      if (theme == "Water") {
        c1 = color("#1B51CC");
        c4 = color("#6AB5E6");
        // console.log("extra water");
      } else if (theme == "Fire") {
        c1 = color("#E4131C");
        c4 = color("#F08A03");
        // console.log("extra fire");
      } else if (theme == "Earth") {
        c1 = color("#2D7B35");
        c4 = color("#C3F3A2");
        // console.log("extra earth");
      }
    } else if (personalityType == "Ambiverted") {
      if (theme == "Water") {
        c1 = color("#263D71");
        c4 = color("#ACCFE1");
      } else if (theme == "Fire") {
        c1 = color("#93110C");
        c4 = color("#F4CF9D");
      } else if (theme == "Earth") {
        c1 = color("#305135");
        c4 = color("#D3EAC3");
      }
    }
    // new color code

    // settings two variables to the  new colors then applying them "randomly"
    if (this.id % 3 == 0) {
      this.color = c1;
      this.color.setAlpha(this.opac);
    } else if (this.id % 2 == 0) {
      this.color = color(color2);
      this.color.setAlpha(this.opac);
    } else if (this.id % 5 == 0) {
      this.color = color(color3);
      this.color.setAlpha(this.opac);
    } else {
      this.color = c4;
      this.color.setAlpha(this.opac);
    }

    for (let i; i < this.randSize; i++) {
      // this.sizes.push(random(this.size));
      this.sizes.push(this.size + i);
    }
  }
  setInc() {
    this.inc = this.inc;
  }

  kill() {
    this.isDead = true;
  }

  dead() {
    return this.isDead;
  }

  update(val) {
    this.xoff = this.xoff + 0.01;

    if (this.limitCounter >= this.yLimit) {
      this.isDead = true;
    } else {
      this.y += this.inc;
      this.limitCounter += this.inc;
    }
  }
  resetExistence() {
    this.x = random(-200, width);
    this.y = random(-200, height);

    this.yLimit = random(100, 350);
    this.limitCounter = 0;
    this.sizes = [];

    for (let i = 0; i < this.randSize; i++) {
      this.sizes.push(random(this.size));
    }

    this.isDead = false;
  }

  draw() {
    push();

    // blendMode(BURN);
    // rotate(actualVal / 10000);
    if (this.y > 10) {
      // for (let i = 0; i < this.sizes.length; i++) {
      // if (actualVal < 440) {
      // var breathVal = map(actualVal, 0, 450, 0, 0.24);
      // } else {
      if (actualVal < 490) {
        var breathVal = map(actualVal, 0, 450, 0.24, -0.1);
      } else {
        breathVal = 0;
      }

      // breathVal = 0;
      // }

      for (let i = 0; i < this.sizes.length; i++) {
        if (state == "hold") {
          this.x += 0;
          this.x -= 0;
          this.y -= 0;
        } else {
          this.x += this.n * 0.0001;
          this.x -= noise(this.n) * 0.0001;
          this.y -= breathVal;
        }

        if (this.size > 8) {
          this.x -= breathVal;
        } else {
          this.x += breathVal;
        }
        if (personalityType == "Introverted") {
          // tint(0, 25, 0);
          tint(50);
          // console.log("TINT: INTRO");
        } else if (personalityType == "Extroverted") {
          // tint(0, 255, 0);
          tint(150);
          // console.log("TINT: EXTRA");
        } else if (personalityType == "Ambiverted") {
          // tint(0, 150, 0);
          tint(255);
          // console.log("TINT: AMBI");
        }
        fill(this.color);

        ellipse(
          this.x + sin(angle),
          this.y + (i * actualVal) / 10,
          actualVal / (15 + i * 4),
          actualVal / (15 + i * 4)
        );

        // ellipse(this.x + sin(angle) + slide.value(), this.y + (i * 20), this.size, this.size);
      }
    }

    pop();
  }
}

var isMobile = false; //initiate as false
// device detection
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true;
}
