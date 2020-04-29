var timerHasFinished = false;
var timerExhaleEnded = false;
var timerHoldEnded = false;
var timerInhaleEnded = false;

var animation = bodymovin.loadAnimation({
  container: document.getElementById("timerCircle"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  path: "scripts/timerdata.json",
});

animation.addEventListener("complete", logData);

let standardWait = 2000;
let inhaleTime = 4000 + standardWait;
let holdTime = 7000 + inhaleTime;
let exhaleTime = 8000 + holdTime;

setTimeout(function () {
  animation.play();
}, standardWait);
// 4-7-8

// FIRST CYCLE ----------------------
// Trigger on First Inhale Finished, should rename variables to Ended not Started
setTimeout(function () {
  timerExhaleEnded = false;
  timerInhaleEnded = true;
}, inhaleTime);

// Trigger on First Hold Finished
setTimeout(function () {
  timerInhaleEnded = false;
  timerHoldEnded = true;
}, holdTime);

// Trigger on First Exhale Finished
setTimeout(function () {
  timerHoldEnded = false;
  timerExhaleEnded = true;
}, exhaleTime);

// SECOND CYCLE ----------------------
// Trigger on Second Inhale Finished, should rename variables to Ended not Started
setTimeout(function () {
  timerExhaleEnded = false;
  timerInhaleEnded = true;
}, (inhaleTime + exhaleTime) );

// Trigger on Second Hold Finished
setTimeout(function () {
  timerInhaleEnded = false;
  timerHoldEnded = true;
}, (holdTime + exhaleTime) );

// Trigger on Second Exhale Finished
setTimeout(function () {
  timerHoldEnded = false;
  timerExhaleEnded = true;
}, (2*exhaleTime) );

// THIRD CYCLE ----------------------
// Trigger on Third Inhale Finished, should rename variables to Ended not Started
setTimeout(function () {
  timerExhaleEnded = false;
  timerInhaleEnded = true;
}, inhaleTime + (2*exhaleTime) );

// Trigger on Third Hold Finished
setTimeout(function () {
  timerInhaleEnded = false;
  timerHoldEnded = true;
}, holdTime + (2*exhaleTime) );

// Trigger on Third Exhale Finished
setTimeout(function () {
  timerHoldEnded = false;
  timerExhaleEnded = true;
}, (3*exhaleTime) );


function logData() {
  document.getElementById("container").classList.add("timerFade");
  timerHasFinished = true;
  setTimeout(function () {
    window.location.href = "restart.html";
  }, standardWait);

  // console.log("animation complete");
}
// You could set three different time outs to all start when the timer starts and then run code at each interval, like sending a signal to p5 to do something. Since this will run on the main thread it is not effected by framerate
// There is a bool for each stage in the timer and There is a time set out to go off on the four seconds, 7 seconds and 8 seconds for inhale exhale hold 4-7-8 but it needs to repeat it only runs once and seems to be a little off beat.
