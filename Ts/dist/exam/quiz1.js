"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ============================================
// 2. 문제 데이터 가져오기 (fetch)
// ============================================
let questions = [];
const loadData = async () => {
    // TODO 1) fetch()로 "./question.json" 파일을 요청한다.
    //         const response = await fetch("./question.json");
    // TODO 2) 응답(response)을 json()으로 변환해서 questions 배열에 저장한다.
    //         questions = await response.json();
    // TODO 3) 데이터를 다 불러왔으면, 첫 문제를 화면에 그리는 함수를 호출한다.
    //         showQuestion();
};
loadData();
// ============================================
// 3. 게임 상태 변수
// ============================================
let currentQuestionIndex = 0; // 지금 몇 번째 문제인지 (0부터 시작)
let score = 0; // 현재까지 맞춘 개수
let selectedAnswer = null; // 사용자가 고른 보기의 인덱스 (아직 안 골랐으면 null)
let gameState = "playing";
// ============================================
// 4. DOM 요소 가져오기
// ============================================
const questionNumber = document.querySelector("#question-number");
const scoreElement = document.querySelector("#score");
const progressBar = document.querySelector("#progress-bar");
const quizSection = document.querySelector("#quiz-section");
const choicesElement = document.querySelector("#choices");
const nextBtn = document.querySelector("#next-button");
const resultSection = document.querySelector("#result-section");
const resultMessage = document.querySelector("#result-message");
const finalScore = document.querySelector("#final-score");
const againButton = document.querySelector("#restart-button");
const questionElement = document.querySelector("#question");
// ============================================
// 5. 현재 문제를 화면에 그리기
// ============================================
function showQuestion() {
    // TODO 1) selectedAnswer 를 null 로 초기화한다. (새 문제니까 아직 아무것도 안 고른 상태)
    // TODO 2) nextBtn.disabled = true 로 설정한다. (답을 골라야 눌리게)
    // TODO 3) questions 배열에서 currentQuestionIndex 번째 문제를 꺼내온다.
    //         const currentQuestion: Question = questions[currentQuestionIndex];
    // TODO 4) questionElement 의 textContent 에 currentQuestion.question 을 넣는다.
    //         (querySelector 결과는 null 일 수도 있으니 questionElement? 로 접근)
    // TODO 5) questionNumber 의 textContent 에
    //         `문제 ${currentQuestionIndex + 1} / ${questions.length}` 형식으로 넣는다.
    // TODO 6) scoreElement 의 textContent 에 `점수 : ${score}` 형식으로 넣는다.
    // TODO 7) 진행률(%)을 계산한다.
    //         const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    // TODO 8) progressBar 는 querySelector("#progress-bar") 라서 타입이 Element 다.
    //         style 을 쓰려면 HTMLElement 로 캐스팅해서 사용한다.
    //         (progressBar as HTMLElement).style.width = `${progress}%`;
    // TODO 9) 보기(선택지) 버튼들을 그리는 함수를 호출한다.
    //         renderChoices(currentQuestion);
}
// ============================================
// 6. 보기(선택지) 버튼 그리기
// ============================================
function renderChoices(currentQuestion) {
    // TODO 1) choicesElement 안에 남아있는 이전 문제의 버튼들을 지운다.
    //         if (choicesElement) choicesElement.innerHTML = "";
    // TODO 2) currentQuestion.choices 배열을 forEach 로 돌면서
    //         각 보기(choice)와 인덱스(index)마다 button 요소를 하나씩 만든다.
    //   - document.createElement("button") 으로 버튼 생성
    //   - button.textContent = choice
    //   - button.className = "choice-button"
    //   - button 클릭 이벤트 등록 -> 클릭하면 selectAnswer(index) 호출
    //   - choicesElement?.appendChild(button) 으로 화면에 추가
}
// ============================================
// 7. 보기를 선택했을 때
// ============================================
function selectAnswer(index) {
    // TODO 1) 이미 답을 골랐다면(selectedAnswer !== null) 아무것도 하지 않고 return 한다.
    //         (한 문제당 한 번만 고를 수 있게)
    // TODO 2) selectedAnswer = index 로 저장한다.
    // TODO 3) 현재 문제를 다시 가져온다.
    //         const currentQuestion = questions[currentQuestionIndex];
    // TODO 4) choicesElement 안에 있는 모든 버튼(.choice-button)을 가져온다.
    //         const buttons = choicesElement?.querySelectorAll<HTMLButtonElement>(".choice-button");
    // TODO 5) buttons 를 forEach 로 돌면서 currentQuestion.answer(정답 인덱스)와 비교한다.
    //   - 정답 버튼에는 "correct" 클래스를 추가한다.
    //   - 사용자가 고른 버튼이 오답이면 "wrong" 클래스를 추가한다.
    // TODO 6) 고른 답이 정답이면 score 를 1 증가시킨다.
    // TODO 7) scoreElement 의 textContent 를 다시 갱신해서 점수를 화면에 반영한다.
    // TODO 8) nextBtn.disabled = false 로 바꿔서 다음 문제로 넘어갈 수 있게 한다.
}
// ============================================
// 8. "다음 문제" 버튼 클릭
// ============================================
nextBtn.addEventListener("click", () => {
    // TODO 1) currentQuestionIndex 를 1 증가시킨다.
    // TODO 2) 만약 currentQuestionIndex 가 questions.length 보다 작다면
    //         -> 아직 문제가 남아있으므로 showQuestion() 을 다시 호출한다.
    // TODO 3) 그렇지 않다면(더 이상 문제가 없다면)
    //         -> gameState = "finished" 로 바꾸고, 결과 화면을 보여주는 showResult() 를 호출한다.
});
// ============================================
// 9. 결과 화면 보여주기
// ============================================
function showResult() {
    // TODO 1) quizSection 을 숨긴다.
    //         quizSection?.classList.add("hidden");
    // TODO 2) resultSection 을 보이게 한다.
    //         resultSection?.classList.remove("hidden");
    // TODO 3) resultMessage 의 textContent 에 점수 비율에 따라 다른 메시지를 넣는다.
    //         예) score / questions.length 가 높으면 "훌륭해요!", 낮으면 "다시 도전해보세요!" 등
    // TODO 4) finalScore 의 textContent 에 `${score} / ${questions.length}` 형식으로 최종 점수를 넣는다.
}
// ============================================
// 10. "다시 시작" 버튼 클릭
// ============================================
againButton?.addEventListener("click", () => {
    // TODO 1) currentQuestionIndex = 0, score = 0, selectedAnswer = null, gameState = "playing" 으로 초기화한다.
    // TODO 2) resultSection 을 숨기고, quizSection 을 다시 보이게 한다.
    // TODO 3) showQuestion() 을 호출해서 첫 문제부터 다시 보여준다.
});
