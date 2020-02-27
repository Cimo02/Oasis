// --- HELPER METHODS ---
function clearScreen() {
  background("#E8EDF4");
}

// draws gradient from top to bottom of the screen, c1 is the top color and c2 is the bottom
function drawGradient(c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
} 
