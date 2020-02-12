// --- INTERACTION METHODS ---
// method that tracks the position of the mouse and updates hover variables
void update(int x, int y) {
  if (overButton(width/4 - 100, 550)){
    overBtn0 = true; 
    overBtn1 = false;
    overBtn2 = false;
  } else if (overButton(2*width/4, 550)){
    overBtn0 = false;
    overBtn1 = true;
    overBtn2 = false;
  } else if (overButton(3*width/4 + 100, 550)){
    overBtn0 = false;
    overBtn1 = false;
    overBtn2 = true;
  } else {
    overBtn0 = overBtn1 = overBtn2 = false; 
  }
}

// method that tracks when the mouse is pressed
void mousePressed() {
   switch(scene){ // Check to see which question we're answering first
     case 0: // Answering Question 1
       if (overBtn0) { ques1 = 0; }
       else if (overBtn1) { ques1 = 1; }
       else if (overBtn2) { ques1 = 2; }
       else { ques1 = -1; }
       scene++;
       break; 
     case 1: // Answering Question 2
       if (overBtn0) { ques2 = 0; }
       else if (overBtn1) { ques2 = 1; }
       else if (overBtn2) { ques2 = 2; }
       else { ques2 = -1; }
       scene++;
       break;
     case 2: // Answer Question 3
       if (overBtn0) { ques3 = 0; }
       else if (overBtn1) { ques3 = 1; }
       else if (overBtn2) { ques3 = 2; }
       else { ques3 = -1; }
       clearScreen();
       scene++;
       break;
     case 3: // Answer Question 4
       if (overBtn0) { ques4 = 0; }
       else if (overBtn1) { ques4 = 1; }
       else if (overBtn2) { ques4 = 2; }
       else { ques4 = -1; }
       clearScreen();
       scene++;
       break;
     case 4: // TODO: Add screenshotting here?
       break;
   }
}

// method to check if we're over a button (parameters are the buttons coords)
boolean overButton(int x, int y) {
  if (mouseX >= x-btnWidth/2 && mouseX <= x+btnWidth/2 && mouseY >= y-btnHeight/2 && mouseY <= y+btnHeight/2) {
    return true;
  }
  else {
    return false; 
  }
}
