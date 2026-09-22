const ResultScreen = () => {
  return (
    <div>
      {/* 결과 화면: 계산한 유형에 해당하는 결과 데이터를 표시하세요. */}
      <section aria-labelledby="result-title">
        <p>당신의 여행 스타일은</p>
        <h2 id="result-title">결과 유형 이름</h2>
        <p>유형을 소개하는 한 줄 문구</p>
        <p>유형에 대한 설명</p>
        <h3>나의 여행 강점</h3>
        <ul>
          <li>강점이 들어갈 자리</li>
        </ul>
        <h3>이렇게 여행해보세요</h3>
        <ul>
          <li>여행 제안이 들어갈 자리</li>
        </ul>
        <h3>추천 여행</h3>
        <p>추천 여행 방식이 들어갈 자리</p>
        <button type="button">다시 하기</button>
      </section>
    </div>
  );
};

export default ResultScreen;
