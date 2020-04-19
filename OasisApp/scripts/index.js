function restart() {
  document.getElementById("mainMenuFade").classList.add("wrapperFade");
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000);
}

let answers;
let currentAnswer;

let flow = [
  "index.html",
  "question1.html",
  "question2.html",
  "question3.html",
  // "calibrationPage.html",
  "app.html",
];
let url = window.location.pathname;

let fileName = url.substring(url.lastIndexOf("/") + 1);

// clear answers when begin button is clicked
const beginQuestions = () => {
  answers = [null, null, null];
  localStorage.setItem("answers", JSON.stringify(answers));

  // page transition
  document.querySelector(".wrapper").classList.add("fadeOut");
  // setTimeout(
  //   () => (window.location.href = flow[flow.indexOf(fileName) + 1]),
  //   1000
  // );

  setTimeout(() => (window.location.href = "question1.html"), 1250);
};

// give option buttons selection styling on click
window.onload = () => {
  let optionButtons = document.querySelectorAll(".buttonContainer");

  for (let button of optionButtons) {
    button.addEventListener("click", function () {
      for (let b of optionButtons) {
        b.querySelector(".buttonInner").classList.remove("selected");
      }

      button.querySelector(".buttonInner").classList.add("selected");
      currentAnswer = parseInt(button.id);
    });
  }
};

// page transition
const fadeAnimations = () => {
  let images = document.querySelectorAll(".optionImage");
  for (let i of images) {
    const listener = () => {
      i.removeEventListener("animationend", listener);
    };

    i.addEventListener("animationend", listener);

    i.classList.add("imageWipeOut");
  }

  {
    let prevBreadcrumb = document.querySelector(".navCurrentBreadcrumb");
    const listener = () => {
      prevBreadcrumb.removeEventListener("animationend", listener);
    };
    prevBreadcrumb.addEventListener("animationend", listener);
    prevBreadcrumb.classList.remove("navCurrentBreadcrumb");
    prevBreadcrumb.classList.add("navPreviousBreadcrumb");
  }

  {
    let questionText = document.querySelector(".questionText");
    const listener = () => {
      questionText.removeEventListener("animationend", listener);
    };
    questionText.addEventListener("animationend", listener);
    questionText.classList.add("questionTextFadeOut");
  }

  {
    let optionText = document.querySelectorAll(".optionText");
    for (let text of optionText) {
      const listener = () => {
        text.removeEventListener("animationend", listener);
      };
      text.addEventListener("animationend", listener);
      text.classList.add("optionTextFadeOut");
    }
  }
};

// back to previous page
const back = () => {
  fadeAnimations();
  setTimeout(
    () => (window.location.href = flow[flow.indexOf(fileName) - 1]),
    1250
  );
};

// answer current question
const answerQuestion = (val) => {
  if (currentAnswer === null || currentAnswer === undefined) {
    currentAnswer = val;
    answers = JSON.parse(localStorage.getItem("answers"));
    answers[document.body.className - 1] = currentAnswer;
    localStorage.setItem("answers", JSON.stringify(answers));

    fadeAnimations();
    setTimeout(
      () => (window.location.href = flow[flow.indexOf(fileName) + 1]),
      1250
    );

    // return;
  } else {
    console.log("Answered");
    answers = JSON.parse(localStorage.getItem("answers"));
    answers[document.body.className - 1] = currentAnswer;
    localStorage.setItem("answers", JSON.stringify(answers));

    fadeAnimations();
    setTimeout(
      () => (window.location.href = flow[flow.indexOf(fileName) + 1]),
      1250
    );
  }
};
