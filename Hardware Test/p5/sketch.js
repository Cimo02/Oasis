var serial;
var portName = '/dev/tty.usbserial-AC00B3SV';
var inData;

function setup() {

  createCanvas(window.innerWidth, window.innerHeight);
  fill(255);
  noStroke();

  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);

  serial.list();
  serial.open(portName);
}

function draw() {

  background(0);

  textSize(16);
  text(inData, 30, 30);

  print(inData);
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    print(i + ' ' + portList[i]);
  }
}

function serverConnected() {
  print('Connected to server.');
}

function portOpen() {
  print('The serial port opened.')
}

function serialEvent() {
  inData = serial.readStringUntil('\n');
}

function serialError(err) {
  print('Something went wrong with the serial port: ' + err);
}

function portClose() {
  print('The serial port closed.');
}
