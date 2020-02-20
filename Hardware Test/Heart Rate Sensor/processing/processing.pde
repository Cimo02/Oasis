import processing.serial.*;

Serial myPort;
String value;
float bpm;

void setup() {
  size(400, 400);
  background(0);
  stroke(255);
  fill(255);
  textSize(50);
  textAlign(CENTER);

  String portName = Serial.list()[1];
  Serial.list();
  myPort = new Serial(this, portName, 9600);
}

void draw() {
  while (myPort.available() > 0) {
    value = myPort.readStringUntil(10);
    if (value != null) {
      bpm = float(value);
      background(0);
      text(bpm, width/2, height/2);
    }
  }
}
