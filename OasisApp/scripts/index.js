var answers = [-1, -1, -1];
var currentAnswer = -1;

function beginQuestions() {
  answers = [-1, -1, -1];
  localStorage.setItem("answers", JSON.stringify(answers));
  console.log("beginning questions...");
  document.querySelector(".wrapper").classList.add("wrapperFade");
  setTimeout(function() {
    window.location.href = "question1.html";
  }, 1000);
}

function restart() {
  document.getElementById("mainMenuFade").classList.add("wrapperFade");
  setTimeout(function() {
    window.location.href = "index.html";
  }, 1000);
}

function toCalibrationPage() {
  window.location.href = "calibrationPage.html";
}

function answerQuestion(question) {
  // check to make sure the user made a selection
  if (currentAnswer == -1) {
    console.log("answer the question!");
    return;
  }

  // load data and save with the new entry
  answers = JSON.parse(localStorage.getItem("answers"));
  answers[question - 1] = currentAnswer;
  localStorage.setItem("answers", JSON.stringify(answers));
  // decide where to navigate
  switch (question) {
    case 1:
      window.location.href = "question2.html";
      console.log("after Q1: " + answers);
      console.log(currentAnswer + " in answered...");
      break;
    case 2:
      window.location.href = "question3.html";
      console.log("after Q2: " + answers);
      console.log(currentAnswer + " in answered...");
      break;
    case 3:
      toCalibrationPage();
      console.log("after Q3: " + answers);
      console.log(currentAnswer + " in answered...");
      break;
  }
  /*
  if (question - 1 == 2) {
    if (answers[0] == -1 || answers[1] == -1 || answers[2] == -1) {
      console.log("answer the question!");
      return;
    }
  }
  */
}

// element is the option's outer circle
function optionSelected(el) {
  // reset other option elements to notSelected
  var innerOptions = document.getElementsByClassName("optionInner");
  var outerOptions = document.getElementsByClassName("optionOuter");
  for (var i = 0; i < innerOptions.length; i++) {
    innerOptions[i].classList.remove("selected");
  }
  for (var i = 0; i < outerOptions.length; i++) {
    outerOptions[i].classList.remove("selectedOuter");
  }

  // el could be the outer or inner circle depending on where the user clicked
  if (
      el.classList.contains("oneOptionOuter") ||
      el.classList.contains("oneOptionInner")
  ) {
    innerOptions[0].classList.add("selected");
    currentAnswer = 0;
  } else if (
      el.classList.contains("twoOptionOuter") ||
      el.classList.contains("twoOptionInner")
  ) {
    innerOptions[1].classList.add("selected");
    currentAnswer = 1;
  } else {
    innerOptions[2].classList.add("selected");
    currentAnswer = 2;
  }

  // animate out after option selected
  setTimeout(function() {
    if (document.getElementsByTagName("body")[0].id == "question1") {
      //answerQuestion(1);
      // window.location.href = "question2.html";
    } else if (document.getElementsByTagName("body")[0].id == "question2") {
      //answerQuestion(2);
      // window.location.href = "question3.html";
    } else if (document.getElementsByTagName("body")[0].id == "question3") {
      //answerQuestion(3);
      // window.location.href = "calibrationPage.html";
    } else if (document.getElementsByTagName("body")[0].id == "calibrationPage") {
      //answerQuestion(3);
      window.location.href = "app.html";
    }
  }, 100);

  // DEBUG answer
  console.log(currentAnswer + " in selected...");
}

function back(question) {
  console.log("going back...");
  switch (question) {
    case 1:
      window.location.href = "index.html";
      break;
    case 2:
      window.location.href = "question1.html";
      break;
    case 3:
      window.location.href = "question2.html";
      break;
    case 4:
      window.location.href = "question3.html";
      break;
  }
}