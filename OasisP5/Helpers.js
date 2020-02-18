// --- HELPER METHODS ---
var button1;
var button2;
var button3;

function drawButtons(option1, option2, option3){
  textAlign(CENTER);
  rectMode(CENTER);
  
  // button 1
  if (overBtn0){ fill(btnHoverColor); }
  else { fill(btnColor); }
  rect(width/4 - 100, 525, btnWidth, btnHeight, 30);
  fill(btnTextColor);
  text(option1, width/4 - 100, 750);
  
  // button 2
  if (overBtn1){ fill(btnHoverColor); }
  else { fill(btnColor); }
  rect(2*width/4, 525, btnWidth, btnHeight, 30);
  fill(btnTextColor);
  text(option2, 2*width/4, 750);
  
  // button 3
  if (overBtn2){ fill(btnHoverColor); }
  else { fill(btnColor); }
  rect(3*width/4 + 100, 525, btnWidth, btnHeight, 30);
  fill(btnTextColor);
  text(option3, 3*width/4 + 100, 750);
}

function clearScreen() {
  background(230, 233, 235);
}
