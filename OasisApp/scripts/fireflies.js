let lightArr = [];

function setup() {
  var cnv = createCanvas(windowWidth - 50, windowHeight);

  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;

  cnv.position(x, 0);

  for (i = 0; i < 20; i++) {
    lightArr.push(new LightObj(random(0, 5), random(0, 5)));
  }
  noStroke();
  // noLoop();
  // background(0, 100);
  // background(0);
}

function draw() {
  for (i = 0; i < 20; i++) {
    lightArr[i].display();
    // console.log(lightArr[i].xoff);
  }
}

function windowResized() {
  resizeCanvas(windowWidth - 50, windowHeight);
}

class LightObj {
  constructor(offsetX, offsetY) {
    this.xoff = offsetX;
    this.yoff = offsetY;
    this.xincrement = 0.001;
    this.yincrement = 0.001;
    this.randW = random(0, width * 2);
    this.randH = random(0, height * 2);
    this.randSize = random(5, 15);
  }

  display() {
    // if (time % 5 == 0) {
    let nx = noise(this.xoff) * this.randW;
    let ny = noise(this.yoff) * this.randH;

    // With each cycle, increment xoff
    this.xoff += this.xincrement;
    this.yoff += this.yincrement;

    // Draw the ellipse at the value produced by perlin noise
    // make a mask that follows the center of the light

    fill(0);
    // ellipse(this.nx, this.ny, 30, 30);
    // ellipse(nx, ny, 30, 30);

    erase();
    fill(0);
    ellipse(nx, ny, 30, 30);
    erase();
    fill(255);
    ellipse(nx, ny, 10, 10);
    noErase();
    fill(132, 164, 246, 25);
    ellipse(nx, ny, 5, 5);
    fill(132, 164, 246, 50);
    ellipse(nx, ny, this.randSize, this.randSize);
    fill(132, 164, 246);
    ellipse(nx, ny, 4, 4);
    // console.log("x: " + nx + " y: " + ny);
    noErase();

    // }
    // if (time % 10 == 5) {
    // erase();
    // rect(nx, ny, 20, 20);
    // noErase();
    // }
  }
}
