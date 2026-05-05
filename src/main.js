const questions = [
  {
    question: "Tina had a big ………… on her knee after she fell down.",
    answers: [
      { text: "accident", correct: false },
      { text: "plaster", correct: false },
      { text: "bruise", correct: true },
      { text: "hurt", correct: false },
    ],
  },
  {
    question: "We attended the film ………………. last year.",
    answers: [
      { text: "address", correct: false },
      { text: "moment", correct: false },
      { text: "blog", correct: false },
      { text: "festival", correct: true },
    ],
  },
  {
    question:
      "Navid: Did your father …………………………… to the radio? Reza: Yes, he did.",
    answers: [
      { text: "listen", correct: true },
      { text: "plaster", correct: false },
      { text: "bruise", correct: false },
      { text: "hurt", correct: false },
    ],
  },
  {
    question: "Hasan ………… sad last month.",
    answers: [
      { text: "wasn’t", correct: true },
      { text: "is", correct: false },
      { text: "are", correct: false },
      { text: "were", correct: false },
    ],
  },
  {
    question: "Could you please ………… me the website address?",
    answers: [
      { text: "take", correct: false },
      { text: "give", correct: true },
      { text: "surf", correct: false },
      { text: "work", correct: false },
    ],
  },
  {
    question: "Did Mina ………… the Internet?",
    answers: [
      { text: "text", correct: false },
      { text: "surf", correct: true },
      { text: "give", correct: false },
      { text: "download", correct: false },
    ],
  },
  {
    question: "I like the message you ...............",
    answers: [
      { text: "connected", correct: false },
      { text: "texted", correct: true },
      { text: "installed", correct: false },
      { text: "attended", correct: false },
    ],
  },
];

const questionPart = document.getElementById("question-holder");
const startBtn = document.getElementById("start");
const answerPart = document.getElementById("answers-holder");

let questionIndex = 0;
let score = 0;

function startQuiz() {
  questionIndex = 0;
  score = 0;
  startBtn.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  const showQuestionIndex = questions[questionIndex];
  const questionNum = questionIndex + 1;
  questionPart.innerHTML = questionNum + "-" + showQuestionIndex.question;

  showQuestionIndex.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.innerHTML = answer.text;
    btn.classList.add("btn");
    answerPart.appendChild(btn);

    if (answer.correct) {
      btn.dataset.correct = answer.correct;
    }

    btn.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  startBtn.style.display = "none";
  while (answerPart.firstChild) {
    answerPart.removeChild(answerPart.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correctBtn = selectedButton.dataset.correct === "true";

  if (correctBtn) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("inCorrect");
  }

  Array.from(answerPart.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }

    btn.disabled = true;
  });

  startBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionPart.innerHTML = `🎉🎉your score is ${score} from ${questions.length} question🎉🎉`;
  startBtn.innerHTML = "play again";
  startBtn.style.display = "block";
}

function handleNextButton() {
  questionIndex++;
  if (questionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
      questionPart.classList.add("end")
  }
}

startBtn.addEventListener("click", () => {
  if (questionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
