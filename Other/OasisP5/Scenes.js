function drawLaunchScreen() {
  image(launchBackgroundImg, 0, 0);
  // Define colors
  var c1 = color(255, 255, 255, 0);
  var c2 = color(255);
  drawGradient(c1, c2);
  noStroke();
  fill("#111E47");
  image(launchExtrasImg, 120, 410);
  textSize(144);
  textStyle(BOLD);
  textLeading(128);
  text("Welcome\nto Oasis.", 120, 600);
  textSize(24);
  textLeading(40);
  textStyle(NORMAL);
  text("When you’re ready, press the button to start the \nexperience. You’ll answer a few questions and be \nguided through a breathing meditation.", 120, 810);
  beginButton = createImg('media/launch-button.png');
  beginButton.position(1400, 425);
  beginButton.mousePressed(beginQuestions);
  beginButton.mouseOver(() => { beginButtonHover(true); });
  beginButton.mouseOut(() => { beginButtonHover(false); });
  // set so the ui only draws once
  firstRun = false;
}

// pass in image url eventually
function drawQuestionScreen(question, option1, option2, option3) {
  fill("#111E47");
  textAlign(LEFT,CENTER);
  textStyle(BOLD);
  textSize(96);
  text(question, 120, height/2);
  // set so the ui only draws once
  firstRun = false;
  
  // set up text for buttons
  textAlign(CENTER);
  textSize(36);
  fill("#5A6587");
  textStyle(NORMAL);
  // option 1
  text(option1, 879, 820);
  option1Button = createImg('media/option-button.png');
  option1Button.position(664, 150);
  option1Button.mousePressed(() => {
    nextQuestion(0);
  });
  // option 2
  text(option2, 1281, 820);
  option2Button = createImg('media/option-button.png');
  option2Button.position(1066, 150);
  option2Button.mousePressed(() => {
    nextQuestion(1);
  });
  // option 3
  text(option3, 1682, 820);
  option3Button = createImg('media/option-button.png');
  option3Button.position(1468, 150);
  option3Button.mousePressed(() => {
    nextQuestion(2);
  });
}
