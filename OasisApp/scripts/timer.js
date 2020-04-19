var animation = bodymovin.loadAnimation({
  container: document.getElementById("timerCircle"),
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: "scripts/timerdata.json",
});
animation.addEventListener("complete", logData);

function logData() {
  document.getElementById("container").classList.add("timerFade");
  setTimeout(function () {
    window.location.href = "restart.html";
  }, 2000);
  // console.log("animation complete");
}
// You could set three different time outs to all start when the timer starts and then run code at each interval, like sending a signal to p5 to do something. Since this will run on the main thread it is not effected by framerate
