export {};

// ============================================
// 1. 타입 정의
// ============================================
// 문제 하나의 데이터 구조
//  - question : 문제 텍스트
//  - choices  : 보기 목록 (배열)
//  - answer   : 정답의 인덱스 (choices 배열에서 정답이 몇 번째인지, 0부터 시작)
interface Question {
  question: string;
  choices: string[];
  answer: number;
}

// 게임 진행 상태 : 문제를 풀고 있는 중 / 다 끝난 상태
type GameState = "playing" | "finished";

// ============================================
// 2. 문제 데이터 가져오기 (fetch)
// ============================================
let questions: Question[] = [];

const loadData = async (): Promise<void> => {
  const response = await fetch("./question.json");
  questions = await response.json();
  showQuestion();
};

loadData();

// ============================================
// 3. 게임 상태 변수
// ============================================
let currentQuestionIndex: number = 0; // 지금 몇 번째 문제인지 (0부터 시작)
let score: number = 0; // 현재까지 맞춘 개수
let selectedAnswer: number | null = null; // 사용자가 고른 보기의 인덱스 (아직 안 골랐으면 null)
let gameState: GameState = "playing";

// ============================================
// 4. DOM 요소 가져오기
// ============================================
const questionNumber =
  document.querySelector<HTMLSpanElement>("#question-number")!;
const scoreElement = document.querySelector<HTMLSpanElement>("#score")!;
const progressBar = document.querySelector<HTMLDivElement>("#progress-bar")!;
const quizSection = document.querySelector("#quiz-section")!;
const choicesElement = document.querySelector("#choices");
const nextBtn = document.querySelector<HTMLButtonElement>("#next-button")!;
const resultSection = document.querySelector("#result-section");
const resultMessage = document.querySelector("#result-message");
const finalScore = document.querySelector("#final-score");
const againButton = document.querySelector("#restart-button");
const questionElement =
  document.querySelector<HTMLHeadingElement>("#question")!;

// ============================================
// 5. 현재 문제를 화면에 그리기
// ============================================
function showQuestion(): void {
  // 1. selectedAnswer = null
  selectedAnswer = null;

  // 2. nextBtn.disabled = true
  nextBtn.disabled = true;

  // 3. 점수 표시 (score 그대로)
  scoreElement.innerText = `점수 : ${score}`;
  // 4. currentQuestion = questions[currentQuestionIndex]
  let currentQuesiton = questions[currentQuestionIndex];

  // 5. 문제 번호 표시 (currentQuestionIndex + 1)
  questionNumber.innerText = `문제 ${currentQuestionIndex + 1} / ${questions.length}`;
  // 6. 문제 텍스트 표시 (currentQuestion.question)
  questionElement.innerText = `${currentQuesiton.question}`;
  // 7. 진행률 바 채우기
  progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
  // 8. renderChoices(currentQuestion) 호출
  renderChoices(currentQuesiton);
}

// ============================================
// 6. 보기(선택지) 버튼 그리기
// ============================================
function renderChoices(currentQuestion: Question): void {}

// ============================================
// 7. 보기를 선택했을 때
// ============================================
function selectAnswer(index: number): void {}

// ============================================
// 8. "다음 문제" 버튼 클릭
// ============================================
nextBtn.addEventListener("click", () => {});

// ============================================
// 9. 결과 화면 보여주기
// ============================================
function showResult(): void {}

// ============================================
// 10. "다시 시작" 버튼 클릭
// ============================================
againButton?.addEventListener("click", () => {});
