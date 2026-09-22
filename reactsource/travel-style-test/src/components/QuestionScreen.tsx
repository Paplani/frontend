const QuestionScreen = () => {
  return (
    <div>
      {/* 질문 화면: 질문과 선택지 내용을 JSON 데이터로 바꿔보세요. */}
      <section aria-labelledby="question-title">
        <p>현재 질문 1 / 8</p>
        <progress value={1} max={8} aria-label="질문 진행 상황" />
        <h2 id="question-title">질문이 들어갈 자리</h2>
        <ul>
          <li>
            <button type="button">선택지 1</button>
          </li>
          <li>
            <button type="button">선택지 2</button>
          </li>
          <li>
            <button type="button">선택지 3</button>
          </li>
          <li>
            <button type="button">선택지 4</button>
          </li>
        </ul>
        <div>
          <button type="button">이전</button>
          <button type="button">다음</button>
        </div>
      </section>
    </div>
  );
};

export default QuestionScreen;
