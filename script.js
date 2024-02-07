const startScreen = document.getElementById("start-screen");
const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const answers = document.getElementById("answers");
const timerContainer = document.getElementById("timer-container");
const endScreen = document.getElementById("end-screen");
const scoreForm = document.getElementById("score-form");
const initialsInput = document.getElementById("initials");
const highscore = document.getElementById("high-scores");



// Quiz data
const quizQuestions = [
  {
      question: "Arrays in JavaScript can be used to store____.",
      answers: [
      {text: "numbers and strings", correct:false },
      {text: "other arrays", correct:false },
       {text: "booleans", correct:false },
       {text: "all of the above", correct:true },
      ]
     },


    {
      question: "Commonly used data types Do NOT Include:",
      answers: [ 
      {text: "Strings", correct:false },
      {text: "Booleans", correct:false },
      {text: "Alerts", correct:true },
      {text: "Numbers", correct:false},
     ]
    },

    {
      question: "The condition in an if/else statement is enclosed with____.",
      answers: [
       {text: "quotes", correct:false },
       {text: "curly brackets", correct:false },
       {text: "parentheses", correct:true },
        {text: "brackets", correct:false },
      ]
    },

    {
      question: "String values must be enclosed within___ when being assigned to variables.",
      answers: [
      {text: "commas", correct:false },
     {text: "curly brackets", correct:false },
      {text: "quotes", correct:true },
      {text: "parentheses", correct:false },
      ]
    },

    {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      answers: [
      {text: "JavaScript", correct:false },
     {text: "terminal/bash", correct:false },
     {text: "console.log", correct:true },
      ]
    },
  ];

  // Other variables
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;
let score =0;

// Function to start the quiz
function startQuiz() {
  startScreen.style.display = "none";
  quizContainer.style.display = "block";
  startTimer();
  showQuestion(currentQuestionIndex);
}

// Function to display a question
function showQuestion(index) {
  const currentQuestion = quizQuestions[index];
  questionText.textContent = currentQuestion.question;
  answers.innerHTML = "";
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.dataset.correct = answer.correct;
    button.addEventListener("click", handleAnswer);
    answers.appendChild(button);
  });
}

// Function to handle the selected answer
function handleAnswer(event) {
  const selectedAnswer = event.target;
  const correct = selectedAnswer.dataset.correct === "true";
  if (correct) {
    score += 5;
  } else {
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
}

// Function to start the timer
function startTimer() {
  timerContainer.textContent = "Time: " + timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerContainer.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  quizContainer.style.display = "none";
  endScreen.style.display = "block";
  scoreForm.style.display = "block";
  initialsInput.focus();
  scoreForm.addEventListener("submit", saveScore);
}

// Function to save the score
function saveScore(event) {
  event.preventDefault();
  const initials = initialsInput.value.trim();
  if (initials !== "") {
    const highScoreItem = document.createElement("li");
    highScoreItem.textContent = initials + " - " + score;
    highscore.appendChild(highScoreItem);
    localStorage.setItem("highScores", highscore.innerHTML);
    initialsInput.value = "";
  }
}

// Event listener for starting the quiz
startScreen.addEventListener("click", startQuiz);

// Load high scores from local storage
highscore.innerHTML = localStorage.getItem("highScores");













