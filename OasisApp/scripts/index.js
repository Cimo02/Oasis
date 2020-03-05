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
            console.log(currentAnswer + " in answered...");
            break;
        case 2:
            window.location.href = "question3.html";
            console.log("after Q2: " + answers);
            console.log(currentAnswer + " in answered...");
            break;
        case 3:
            window.location.href = "app.html";
            console.log("after Q3: " + answers);
            console.log(currentAnswer + " in answered...");
            break;
    }

    
}

// element is the option's outer circle
function optionSelected(el) {
    // reset other option elements to notSelected
    var innerOptions = document.getElementsByClassName("optionInner");
    var outerOptions = document.getElementsByClassName("optionOuter");
    for(var i = 0; i < innerOptions.length; i++){
        innerOptions[i].classList.remove("selected");
    }
    for(var i = 0; i < outerOptions.length; i++){
        outerOptions[i].classList.remove("selectedOuter");
    }

    // el could be the outer or inner circle depending on where the user clicked
    if (el.classList.contains("oneOptionOuter") || el.classList.contains("oneOptionInner")) {
        innerOptions[0].classList.add("selected");
        currentAnswer = 0;
    } else if (el.classList.contains("twoOptionOuter") || el.classList.contains("twoOptionInner")) {
        innerOptions[1].classList.add("selected");
        currentAnswer = 1;
    } else {
        innerOptions[2].classList.add("selected");
        currentAnswer = 2;
    }
    // DEBUG answer
    console.log(currentAnswer + " in selected...");
}

function optionMouseOver(el) {
    // remove hovered class from every button that has it 
    var options = document.getElementsByClassName("optionInner");
    for(var i = 0; i < options.length; i++){
        options[i].classList.remove("hovered");
    }

    // set currentAnswer variable
    if (el.classList.contains("oneOptionOuter") || el.classList.contains("oneOptionInner")) {
        options[0].classList.add("hovered");
    } else if (el.classList.contains("twoOptionOuter") || el.classList.contains("twoOptionInner")) {
        options[1].classList.add("hovered");
    } else {
        options[2].classList.add("hovered");
    }
}

function optionMouseOut() {
    // remove hovered from all buttons 
    var options = document.getElementsByClassName("optionInner");
    for(var i = 0; i < options.length; i++){
        options[i].classList.remove("hovered");
    }
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