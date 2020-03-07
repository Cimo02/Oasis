var serial; // variable to hold an instance of the serialport library
var portName = "/dev/tty.usbmodem14201"; // fill in your serial port name here
var inData; // variable to hold the input data from Arduino
var outData = 0; // variable to hold the output data to Arduino

let actualVal;

let setLimitButton;

function setup() {
  lowEnd = 10;
  highEnd = 200;

  var cnv = createCanvas(600, 600);

  var x = (windowWidth - width) / 1.25;
  var y = (windowHeight - height) / 2;

  //set up communication port
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on("list", printList); // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen); // callback for the port opening
  serial.on("data", serialEvent); // callback for when new data arrives
  serial.on("error", serialError); // callback for errors
  serial.on("close", portClose); // callback for the port closing
  // background(0, 0, 0, 100);
  // background(255, 255, 255, 100);
  background(color("#e8edf4"));
  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  cnv.position(x, y);
}
let highSet = false;
let lowSet = false;
let lowEnd = 0;
let highEnd = 0;
let isCalibrated = false;
function setLimits() {
  if (lowSet == false) {
    lowEnd = inData;
    console.log("lowEnd: " + lowEnd);
    lowSet = true;
  } else if (highSet == false) {
    highEnd = inData;
    console.log("highEnd: " + highEnd);
    highSet = true;
  }
}
let time = 0;

// Store Answers
let Q1 = 0;
let Q2 = 0;
let Q3 = 0;
function draw() {
  if (highSet && lowSet == true) {
    isCalibrated = true;
    let answers = JSON.parse(localStorage.getItem("answers"));

    Q1 = answers[0];
    Q2 = answers[1];
    Q3 = answers[2];

    // rerender the canvas

    x = (windowWidth - width) / 2;
    y = (windowHeight - height) / 2;
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(x, y);

    console.log(Q1 + " " + Q2 + " " + Q3);
  }
  // if both the low and high are set then it is calibrated and will run the sim
  if (isCalibrated == true) {
    //
    // Calculate mapping of indata
    // DO STUFF
    background(232, 237, 244, 75);
    let circleAmt = Math.round(actualVal / 100);
    actualVal = map(inData, lowEnd, highEnd, 0, 500, true);
    for (let i = 0; i < circleAmt; i++) {
      noStroke();
      fill(132, 164, 246, 65);
      ellipse(width / 2, height / 2, i * 100, i * 100);
    }
    // runHomeVisual();
    //
  } else {
    // if it is not calibrated show circles
    background(232, 237, 244, 75);
    let circleAmt = Math.round(actualVal / 100);
    actualVal = map(inData, lowEnd, highEnd, 0, 500, true);
    for (let i = 0; i < circleAmt; i++) {
      noStroke();
      fill(132, 164, 246, 65);
      ellipse(width / 2, height / 2, i * 100, i * 100);
    }
  }
  // val = slider.value();
}

// --white: #f5f8fc;
// --red: #d2290a;
// --light-blue: #c0d1fc;
// --medium-blue: #84a4f6;
// --dark-blue: #304fa1;
// --darker-blue: #283e82;
// --light-gray: #dadfe8;
// --medium-gray: #9dacca;
// --dark-gray: #111e47;

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

function setCalibration() {
  setLimits();
}
