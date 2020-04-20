var timerHasFinished = false;
var timerExhaleStarted = false;
var timerHoldStarted = false;
var timerInhaleStarted = false;

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
let exhaleTime = 8000 + inhaleTime;
let holdTime = 7000 + exhaleTime;

setTimeout(function () {
  animation.play();
}, standardWait);
// 4-7-8

// Trigger on Inhale Finished, should rename variables to Ended not Started
setTimeout(function () {
  timerExhaleStarted = false;
  timerInhaleStarted = true;
}, inhaleTime);

// Trigger on Hold Finished
setTimeout(function () {
  timerInhaleStarted = false;
  timerHoldStarted = true;
}, holdTime);

// Trigger on Exhale Finished
setTimeout(function () {
  timerHoldStarted = false;
  timerExhaleStarted = true;
}, exhaleTime);

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
