// 화면 구조만 담은 예제입니다. 스타일, 상태, API 요청은 직접 추가하세요.
export default function MovieReservation() {
  return (
    <div className="reservation-page">
      <header className="page-header">
        <h1>작은 영화관</h1>
        <p>원하는 좌석을 선택하고 예약해 보세요.</p>
      </header>

      <main>
        <section className="movie-info" aria-labelledby="movie-heading">
          <h2 id="movie-heading">상영 정보</h2>
          <h3>영화 제목</h3>
          <dl>
            <div>
              <dt>상영 일시</dt>
              <dd>상영 날짜와 시간</dd>
            </div>
            <div>
              <dt>상영관</dt>
              <dd>1관</dd>
            </div>
            <div>
              <dt>전체 좌석</dt>
              <dd>20석</dd>
            </div>
          </dl>
        </section>

        <section className="seat-section" aria-labelledby="seat-heading">
          <header>
            <h2 id="seat-heading">좌석 선택</h2>
            <button type="button">좌석 현황 새로고침</button>
          </header>

          <ul className="seat-legend" aria-label="좌석 상태 안내">
            <li><span className="legend-available" aria-hidden="true" />예약 가능</li>
            <li><span className="legend-selected" aria-hidden="true" />선택 중</li>
            <li><span className="legend-reserved" aria-hidden="true" />예약 완료</li>
          </ul>

          <div className="screen">SCREEN</div>

          {/* 나중에 서버에서 받은 좌석 목록을 map으로 표시해 보세요. */}
          {/* 선택한 좌석에는 aria-pressed, 예약된 좌석에는 disabled를 연결하세요. */}
          <div className="seat-layout">
            <div className="seat-row" role="group" aria-label="A열">
              <span className="row-label" aria-hidden="true">A</span>
              <button type="button" className="seat" aria-pressed={false}>A1</button>
              <button type="button" className="seat" aria-pressed={false}>A2</button>
              <button type="button" className="seat" aria-pressed={false}>A3</button>
              <button type="button" className="seat" aria-pressed={false}>A4</button>
              <button type="button" className="seat" aria-pressed={false}>A5</button>
            </div>
            <div className="seat-row" role="group" aria-label="B열">
              <span className="row-label" aria-hidden="true">B</span>
              <button type="button" className="seat" aria-pressed={false}>B1</button>
              <button type="button" className="seat" aria-pressed={false}>B2</button>
              <button type="button" className="seat" aria-pressed={false}>B3</button>
              <button type="button" className="seat" aria-pressed={false}>B4</button>
              <button type="button" className="seat" aria-pressed={false}>B5</button>
            </div>
            <div className="seat-row" role="group" aria-label="C열">
              <span className="row-label" aria-hidden="true">C</span>
              <button type="button" className="seat" aria-pressed={false}>C1</button>
              <button type="button" className="seat" aria-pressed={false}>C2</button>
              <button type="button" className="seat" aria-pressed={false}>C3</button>
              <button type="button" className="seat" aria-pressed={false}>C4</button>
              <button type="button" className="seat" aria-pressed={false}>C5</button>
            </div>
            <div className="seat-row" role="group" aria-label="D열">
              <span className="row-label" aria-hidden="true">D</span>
              <button type="button" className="seat" aria-pressed={false}>D1</button>
              <button type="button" className="seat" aria-pressed={false}>D2</button>
              <button type="button" className="seat" aria-pressed={false}>D3</button>
              <button type="button" className="seat" aria-pressed={false}>D4</button>
              <button type="button" className="seat" aria-pressed={false}>D5</button>
            </div>
          </div>

          <p className="seat-status" role="status">
            예약할 좌석을 선택해주세요.
          </p>
        </section>

        <section className="booking-section" aria-labelledby="booking-heading">
          <h2 id="booking-heading">예약 정보</h2>
          <dl>
            <div>
              <dt>선택한 좌석</dt>
              <dd>선택한 좌석 없음</dd>
            </div>
          </dl>
          <button type="button" className="reserve-button">예약하기</button>
          <p className="booking-status" role="status">
            아직 예약 내역이 없습니다.
          </p>
          {/* 예약 성공 후 해당 내역과 취소 버튼을 표시하도록 연결하세요. */}
          <button type="button" className="cancel-button">예약 취소</button>
          {/* 오류가 발생했을 때 메시지를 넣을 영역입니다. */}
          <p className="error-message" role="alert" />
        </section>
      </main>

      <footer>
        <p>작은 영화관 · 좌석 예약</p>
      </footer>
    </div>
  );
}
