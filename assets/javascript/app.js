var questionArray = ["What was the first musclecar?", "Who designed the Volkwagen Bettle?", "What Kind of Car is the General Lee from 'The Dukes of Hazard'?", "What manufacturer has the most 24 hours of Le Mans wins?", "What was the first Japanese car to be produced in the United States?", "What year was the Corvette first introduced?", "What was the first commercially available hybrid gasoline-electric car in the United States?", "Which one doesnt belong?"];
var answerArray = [
    ["Pontiac GTO", "Ford Mustang", "Chevrolet Camaro", "Plymouth GTX"],
    ["Volkswagen", "Hitler", "Porsche", "Henry Ford"],
    ["Chevrolet Camaro", "Dodge Charger R/T", "Plymouth GTX", "Chevrolet Nova"],
    ["Porsche", "Ferrari", "Toyota", "Nissan"],
    ["Honda Accord", "Mazda Miata", "Toyota Camry", "Nissan Maxima"],
    ["1943", "1953", "1963", "1973"],
    ["Toyota Prius", "Saturn Vue", "Honda Insight", "Honda Civic hybrid"],
    ["LSD", "Water thermostat", "O2 sensor", "Blinker fluid"]
];
var correctAnswers = ["A. Pontiac GTO", "C. Porsche", "B. Dodge Charger R/T", "A. Porsche", "A. Honda Accord", "B. 1953", "C. Honda Insight", "D. Blinker fluid"];
var firstScreen;
var questionScreen;
var countDown = 10;
var questionCounter = 0;
var selectedAnswer;
var timerTime;
var correctCount = 0;
var incorrectCount = 0;
var timeoutCount = 0;

$(document).ready(function() {

    function startPage() {
        firstScreen = "<p class='text-center start-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(firstScreen);
    }

    $("body").on("click", ".start-button", function(event) {
        generateQuestion();
        //starts timer
        timerFix();
    });

    $("body").on("click", ".answer", function(event) {
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(timerTime);
            generateWin();
        } else {
            clearInterval(timerTime);
            generateLoss();
        }
    });
    $("body").on("click", ".reset-button", function(event) {

        resetGame();
    });

    startPage();
});

function rules() {
    if (questionCounter < 7) {
        questionCounter++;
        generateQuestion();
        countDown = 10;
        timerFix();
    } else {
        allDone();
    }
}

function generateQuestion() {
    questionScreen = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>10</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".mainArea").html(questionScreen);
}

function allDone() {
    questionScreen = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + countDown + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctCount + "</p>" + "<p>Wrong Answers: " + incorrectCount + "</p>" + "<p>Unanswered: " + timeoutCount + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(questionScreen);
}

function generateWin() {
    correctCount++;
    questionScreen = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + countDown + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block' src='assets/images/right.png'>";
    $(".mainArea").html(questionScreen);
    setTimeout(rules, 2000);
}

function generateLoss() {
    incorrectCount++;
    questionScreen = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + countDown + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block' src='assets/images/wrong.png'>";
    $(".mainArea").html(questionScreen);
    setTimeout(rules, 2000);
}

function generateLossDueToTimeOut() {
    timeoutCount++;
    questionScreen = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + countDown + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block' src='assets/images/wrong.png'>";
    $(".mainArea").html(questionScreen);
    setTimeout(rules, 2000);
}

function timerFix() {
    timerTime = setInterval(tenSeconds, 1000);

    function tenSeconds() {
        if (countDown === 0) {
            clearInterval(timerTime);
            generateLossDueToTimeOut();
        }
        if (countDown > 0) {
            countDown--;
        }
        $(".timer").html(countDown);
    }
}

function resetGame() {
    questionCounter = 0;
    correctCount = 0;
    incorrectCount = 0;
    unansweredCount = 0;
    countDown = 10;
    generateQuestion();
    timerFix();
}