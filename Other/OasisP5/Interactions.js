// --- INTERACTION METHODS ---
function beginQuestions() {
  beginButton.remove();
  scene++;
  firstRun = true;
}

// hover function for "begin" button -------------------- GET WORKING, RN IT DOESN'T GO 
function beginButtonHover(hovering) {
  // remove previous version of the button
  beginButton.remove();
  
  // set new image depending on hover status
  if (hovering) {
    beginButton = createImg('media/launch-button-hover.png');
  } else {
    beginButton = createImg('media/launch-button.png');
  }
  
  // set button options
  beginButton.position(1400, 425);
  beginButton.mousePressed(beginQuestions);
  beginButton.mouseOver(() => { beginButtonHover(true); });
  beginButton.mouseOut(() => { beginButtonHover(false); });
}

// remove buttons after each screen because images will change
function nextQuestion(answer) {
  // set the answer to the corresponding question variable
  switch(scene){
    case 1:
      ques1 = answer;
      break;
    case 2: 
      ques2 = answer;
      break;
    case 3:
      ques3 = answer;
      break;
    case 4:
      // set color palette here 
      firstColor = themes[answer].colors[0];
      secondColor = themes[answer].colors[1];
      thirdColor = themes[answer].colors[2];
      backgroundColor = themes[answer].background;
      ques4 = answer;
      break;
  }
  
  // remove buttons
  option1Button.remove();
  option2Button.remove();
  option3Button.remove();
  
  // set app variables
  scene++;
  firstRun = true;
  
  clearScreen();
}
