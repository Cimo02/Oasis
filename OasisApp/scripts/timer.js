var animation = bodymovin.loadAnimation({
  container: document.getElementById("timerCircle"),
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: "scripts/timerdata.json"
});
animation.addEventListener("complete", logData);

function logData() {
  document.getElementById("container").classList.add("timerFade");
  setTimeout(function() {
    window.location.href = "restart.html";
  }, 2000);
  console.log("animation complete");
}
// let dotID = 1;
// let done1 = false;
// let done2 = false;
// let done3 = false;
// let setTime;
// let partID;

// var radialObj = radialIndicator("#timerCircle", {
//   barColor: "#111E47",
//   barWidth: 3,
//   initValue: 100,
//   radius: 145,
//   displayNumber: false,
//   roundCorner: true,
//   duration: 1000
// });

// const countDownClock = (number = 100, format = "seconds") => {
//   // const d = document;

//   // const secondsElement = d.querySelector(".seconds");
//   let countdown;
//   convertFormat(format);

//   function convertFormat(format) {
//     switch (format) {
//       case "seconds":
//         return timer(number);
//     }
//   }

//   function timer(seconds) {
//     const now = Date.now();
//     // console.log(now);
//     const then = now + seconds * 1000;

//     countdown = setInterval(() => {
//       const secondsLeft = Math.round((then - Date.now()) / 1000);

//       if (secondsLeft <= 0) {
//         clearInterval(countdown);
//         displayTimeLeft(secondsLeft);
//         return;
//       }

//       displayTimeLeft(secondsLeft);
//     }, 1000);
//   }

//   function displayTimeLeft(seconds) {
//     console.log(partID);

//     console.log("seconds: " + seconds + "   " + "setTime: " + partID);
//     console.log(100 - (seconds / partID) * 100);
//     if (partID == 4) {
//       // radialObj.minValue = 0;
//       // radialObj.maxValue = partID;
//       radialObj.duration = 800;
//       radialObj.animate((seconds / partID) * 100);
//     } else if (partID == 7) {
//       // radialObj.minValue = 0;
//       // radialObj.maxValue = partID;
//       radialObj.duration = 700;
//       radialObj.animate(100 - (seconds / partID) * 100);
//     } else if (partID == 8) {
//       // radialObj.minValue = 0;
//       // radialObj.maxValue = partID;
//       radialObj.duration = 800;

//       radialObj.animate((seconds / partID) * 100);
//     }
//   }
// };
// let timeDivision = 1;
// function runSession(ID) {
//   // document.getElementById("timerCircle").style.transform = `rotate(0 deg)`;
//   radialObj.animate(100);
//   document.getElementById("instructions").innerHTML = "Inhale";
//   partID = 4;
//   countDownClock(4 / timeDivision, "seconds");
//   setTimeout(function() {
//     // document.getElementById("timerCircle").style.transform = `rotate(0 deg)`;
//     radialObj.animate(0);
//     document.getElementById("instructions").innerHTML = "Hold";
//     partID = 7;
//     countDownClock(7 / timeDivision, "seconds");
//   }, 6000 / timeDivision);
//   setTimeout(function() {
//     // document.getElementById("timerCircle").style.transform = `rotate(0 deg)`;
//     radialObj.value(100);
//     document.getElementById("instructions").innerHTML = "Exhale";
//     partID = 8;
//     countDownClock(8 / timeDivision, "seconds");
//   }, 14000 / timeDivision);
//   setTimeout(function() {
//     console.log("cycle completed");
//     radialObj.animate(100);
//     document.getElementById(`dot${ID}`).style.background = `#84A4F6`;
//     document.getElementById(`dot${ID}`).style.opacity = `100`;
//   }, 23500 / timeDivision);
// }

// // let sessionNumber = 0;
// function runFullExercise() {
//   runSession(dotID);
//   let timerInterval = setInterval(function() {
//     dotID++;

//     if (dotID >= 4) {
//       clearInterval(timerInterval);
//     } else {
//       // partID = 3;

//       runSession(dotID);
//     }
//   }, 25500 / timeDivision);

//   // timerInterval();
//   // runSession(dotID).then(function() {
//   //   // sessionNumber++;

//   console.log("full exercise completed");
//   // });
// }

// runFullExercise();
