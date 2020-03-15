const countDownClock = (number = 100, format = "seconds") => {
  // const d = document;

  // const secondsElement = d.querySelector(".seconds");
  let countdown;
  convertFormat(format);

  function convertFormat(format) {
    switch (format) {
      case "seconds":
        return timer(number);
    }
  }

  function timer(seconds) {
    // let rate = 100;
    const now = Date.now();
    console.log(now);
    const then = now + seconds * 1000;

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft <= 0) {
        clearInterval(countdown);
        displayTimeLeft(secondsLeft);
        return;
      }

      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  function displayTimeLeft(seconds) {
    // secondsElement.textContent =
    //   seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    document.getElementById("timerCircle").style.transform = `rotate(${360 /
      seconds}deg)`;
    if (seconds <= 0) {
      console.log("Complete");
    } else {
      console.log(seconds);
    }
  }
};
let timeDivision = 1;
function runSession(ID) {
  console.log("CurrentID: " + ID);
  // document.getElementById("timerCircle").style.transform = `rotate(0 deg)`;
  document.getElementById("instructions").innerHTML = "Inhale";
  countDownClock(4 / timeDivision, "seconds");
  setTimeout(function() {
    // document.getElementById("timerCircle").style.transform = `rotate(0 deg)`;
    document.getElementById("instructions").innerHTML = "Hold";
    countDownClock(7 / timeDivision, "seconds");
  }, 4000 / timeDivision);
  setTimeout(function() {
    // document.getElementById("timerCircle").style.transform = `rotate(0 deg)`;
    document.getElementById("instructions").innerHTML = "Exhale";
    countDownClock(8 / timeDivision, "seconds");
  }, 11000 / timeDivision);
  setTimeout(function() {
    console.log("cycle completed");

    document.getElementById(`dot${ID}`).style.background = `#84A4F6`;
    document.getElementById(`dot${ID}`).style.opacity = `100`;
  }, 19000 / timeDivision);
}
let dotID = 1;
// let sessionNumber = 0;
function runFullExercise() {
  runSession(dotID);
  let timerInterval = setInterval(function() {
    dotID++;
    if (dotID >= 4) {
      clearInterval(timerInterval);
    } else {
      runSession(dotID);
    }
  }, 19000 / timeDivision);

  // timerInterval();
  // runSession(dotID).then(function() {
  //   // sessionNumber++;

  console.log("full exercise completed");
  // });
}

runFullExercise();
// go for 4 seconds
// change text
// got for 7 seconds
// change text
// go for 8 second
// change text
// fill circle
// restart
