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

let questions: Question[] = []; // 실제로 화면에 출제되는 문제 (무작위 5개)
let allQuestions: Question[] = []; // question.json에서 받아온 전체 문제 목록

const QUESTION_COUNT = 5; // 한 판에 풀 문제 개수

// 배열을 무작위로 섞어서 새 배열로 반환한다 (Fisher-Yates shuffle)
// 원본 배열(array)은 건드리지 않는다.
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const loadData = async (): Promise<void> => {
  const response = await fetch("./question.json");
  allQuestions = await response.json();

  // 전체 문제를 섞은 뒤 앞에서 QUESTION_COUNT개만 뽑는다.
  questions = shuffle(allQuestions).slice(0, QUESTION_COUNT);

  showQuestion();
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
const questionNumber = document.querySelector<HTMLSpanElement>("#question-number")!;
const scoreElement = document.querySelector<HTMLSpanElement>("#score")!;
const progressBar = document.querySelector<HTMLDivElement>("#progress-bar")!;
const quizSection = document.querySelector<HTMLElement>("#quiz-section")!;
const choicesElement = document.querySelector<HTMLDivElement>("#choices")!;
const nextBtn = document.querySelector<HTMLButtonElement>("#next-button")!;
const resultSection = document.querySelector<HTMLElement>("#result-section")!;
const resultMessage = document.querySelector<HTMLParagraphElement>("#result-message")!;
const finalScore = document.querySelector<HTMLParagraphElement>("#final-score")!;
const againButton = document.querySelector<HTMLButtonElement>("#restart-button")!;
const questionElement = document.querySelector<HTMLHeadingElement>("#question")!;

function showQuestion(): void {
  // 문제 가져오기
  const currentQuestion: Question = questions[currentQuestionIndex];

  // 가져온 문제 화면에 보여주기
  // querySelector 결과는 null 일 수도 있어서, 존재할 때만 값을 넣어준다 (null 체크)
  questionElement.textContent = currentQuestion.question;
  questionNumber.textContent = `문제 ${currentQuestionIndex + 1} / ${questions.length}`;
  scoreElement.textContent = `점수 ${score}`;

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  // progressBar는 querySelector("#progress-bar")라 타입이 Element라서 style이 없다.
  // HTMLElement로 캐스팅해서 style을 사용한다.
  progressBar.style.width = `${progress}%`;

  // 초기화
  choicesElement.innerHTML = "";
  selectedAnswer = null;
  nextBtn.disabled = true;

  // 보기 제시
  currentQuestion.choices.forEach((choice: string, idx: number) => {
    // <button type='button' class=''>push()</button>
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice;

    // 사용자가 보기 선택
    button.addEventListener("click", () => {
      selectAnswer(idx);
    });

    choicesElement.appendChild(button);
  });
}

function selectAnswer(idx: number): void {
  // 한번 답을 선택하면 다른 보기들은 비활성화
  // (함수 매개변수 이름이 idx 이므로 answerIdx가 아니라 idx를 사용한다)
  selectedAnswer = idx;

  const currentQuestion: Question = questions[currentQuestionIndex];
  const choiceButtons = document.querySelectorAll<HTMLButtonElement>(".choice-button");
  choiceButtons.forEach((button: HTMLButtonElement) => {
    button.disabled = true;
  });
  // 정답인 경우 correct 클래스명 추가, 점수 증가
  choiceButtons[currentQuestion.answer].classList.add("correct");

  if (idx !== currentQuestion.answer) {
    // 오답인 경우, 사용자가 실제로 고른 버튼(idx)에 wrong 클래스명 추가
    choiceButtons[idx].classList.add("wrong");
  } else {
    score += 20;
  }

  // 점수 화면 업데이트
  scoreElement.textContent = `점수 ${score}`;
  // 다음 버튼 활성화
  nextBtn.disabled = false;
}

// 다음문제
function nextQuestion(): void {
  // currentQuestionIndex 증가
  currentQuestionIndex++;

  // 마지막 문제인지 확인
  if (currentQuestionIndex >= questions.length) {
    finishQuiz();
    return;
  }

  // 문제 출제
  showQuestion();
}

// 퀴즈 종료
function finishQuiz(): void {
  // 게임상태 업데이트
  gameState = "finished";
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  finalScore.textContent = `${score}/${questions.length * 20}점`;

  // 결과 메세지 출력
  if (score === questions.length * 20) {
    resultMessage.textContent = "모든 문제를 맞췄습니다";
  } else if (score >= 60) {
    resultMessage.textContent = "잘했습니다.";
  } else {
    resultMessage.textContent = "조금 더 공부해봅시다.";
  }
}

// 다시 시작 클릭 시
// 문제 인덱스 초기화, 점수 초기화
function restartQuiz(): void {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  gameState = "playing";

  // 다시 시작할 때도 전체 문제 중에서 새로 무작위 5개를 뽑는다.
  questions = shuffle(allQuestions).slice(0, QUESTION_COUNT);

  quizSection.classList.remove("hidden");
  resultSection.classList.add("hidden");
  showQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
againButton.addEventListener("click", restartQuiz);
