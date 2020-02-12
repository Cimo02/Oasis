// --- HELPER METHODS ---
void drawText(String text, int x, int y){
  text(text, x, y);
}

void drawButtons(String option1, String option2, String option3){
  textAlign(CENTER);
  rectMode(CENTER);
  
  // button 1
  if (overBtn0){ fill(btnHoverColor); }
  else { fill(btnColor); }
  rect(width/4 - 100, 525, btnWidth, btnHeight, 30);
  fill(btnTextColor);
  drawText(option1, width/4 - 100, 750);
  
  // button 2
  if (overBtn1){ fill(btnHoverColor); }
  else { fill(btnColor); }
  rect(2*width/4, 525, btnWidth, btnHeight, 30);
  fill(btnTextColor);
  drawText(option2, 2*width/4, 750);
  
  // button 3
  if (overBtn2){ fill(btnHoverColor); }
  else { fill(btnColor); }
  rect(3*width/4 + 100, 525, btnWidth, btnHeight, 30);
  fill(btnTextColor);
  drawText(option3, 3*width/4 + 100, 750);
}

void clearScreen() {
  background(230, 233, 235);
}
