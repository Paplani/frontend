// 1.타입(인터페이스로) 정의
// Question

interface Question {
  question: string;
  choices: string[];
  answer: number;
}

type GameState = "playing" | "finished";

// 2.문제 데이터 가져오기
// fetch()

const loadData = async () => {
  const response = await fetch("./question.json");
  const data: Question[] = await response.json();
};

loadData();

// 3.게임 상태 변수
// currentQuestionIndex : number(초기값 0)
// score : 위와 동일
// selectedAnswer : 숫자 or null (초기값 null)
// gameState : GameState (초기값 playing)

let currentQuestionIndex: number = 0;
let score: number = 0;
let selectedAnswer: number | null = null;
let gameState: GameState = "playing";

// 4. dom 요소 가져오기
// 싹다 가져오기
const questionNumber = document.querySelector("#question-number");
const currentScore = document.querySelector("#score");
const progress = document.querySelector("#progress-bar");
const question = document.querySelector("#question");
const choice = document.querySelector("#choices");
const nestButton = document.querySelector("#next-button");
const resultMessage = document.querySelector("#result-message");
const finalScore = document.querySelector("#final-score");
const againButton = document.querySelector("#restart-button");

function renderQuestion() {}
