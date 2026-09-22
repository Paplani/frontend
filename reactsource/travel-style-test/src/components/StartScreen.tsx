const StartScreen = () => {
  return (
    <div>
      {/* 시작 화면: 나중에 현재 화면 상태에 따라 표시하세요. */}
      <section aria-labelledby="start-title">
        <h2 id="start-title">나의 여행 스타일은?</h2>
        <p>
          낯선 도시에서 당신은 어떤 하루를 보내고 싶나요? 8개의 질문으로 나만의
          여행 스타일을 만나보세요.
        </p>
        <p>약 2분 · 정답은 없어요. 지금 가장 끌리는 답을 골라주세요.</p>
        <button type="button">테스트 시작</button>
      </section>
    </div>
  );
};

export default StartScreen;
