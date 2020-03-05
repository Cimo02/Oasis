var answers = [-1, -1, -1];
var currentAnswer = -1;

function beginQuestions() {
    answers = [-1, -1, -1];
    localStorage.setItem("answers", JSON.stringify(answers));
    console.log("beginning questions...");
    window.location.href = "question1.html";
}

function answerQuestion(question) {
    // check to make sure the user made a selection
    if (currentAnswer == -1) { 
        console.log("answer the question!");
        return; 
    }
    // load data and save with the new entry
    answers = JSON.parse(localStorage.getItem("answers"));
    answers[question-1] = currentAnswer;
    localStorage.setItem("answers", JSON.stringify(answers));
    // decide where to navigate
    switch(question){
        case 1:
            window.location.href = "question2.html";
            console.log("after Q1: " + answers);
            break;
        case 2:
            window.location.href = "question3.html";
            console.log("after Q2: " + answers);
            break;
        case 3:
            window.location.href = "app.html";
            console.log("after Q3: " + answers);
            break;
    }
}

function optionSelected(el) {
    // reset other option elements
    var options = document.getElementsByClassName("optionInner");
    for(var i = 0; i < options.length; i++){
        options[i].classList.remove("selected");
        options[i].classList.remove("notSelected");
        options[i].classList.add("notSelected");
    }

    // set the correct element class
    el.classList.remove("notSelected");
    el.classList.add("selected");

    // set currentAnswer variable
    if (el.classList.contains("oneOptionInner")) {
        currentAnswer = 0;
    } else if (el.classList.contains("twoOptionInner")) {
        currentAnswer = 1;
    } else {
        currentAnswer = 2;
    }
    // DEBUG answer
    console.log(currentAnswer + " selected...");
}

function back(question) {
    console.log("going back...");
    switch(question){
        case 1:
            window.location.href = "index.html";
            break;
        case 2:
            window.location.href = "question1.html";
            break;
        case 3:
            window.location.href = "question2.html";
            break;
    }
}