import { useState } from "react";

const Say = () => {
  // 입장버튼을 누르면 안녕하세요
  // 퇴장버튼을 누르면 안녕히가세요

  const [message, setMessage] = useState("");
  const [color, setColor] = useState("black");

  const onClickEnter = () => setMessage("안녕하세요");
  const onClickLeave = () => setMessage("안녕히가세요");

  // message 색상 변경
  const changeColor = (c) => setColor(c);

  return (
    <div>
      <div>
        <button onClick={onClickEnter}>입장</button>
        <button onClick={onClickLeave}>퇴장</button>
      </div>
      {/* color : color 의 축약형*/}
      <h2 style={{ color }}>{message}</h2>
      {/* 버튼을 누르면 changeColor 함수를 실행해라 */}
      {/* red라는 인자를 값을 넣어서 실행하고 싶기 때문에 익명 함수를 하나 만들어서 전달해야 함 */}
      <button onClick={() => changeColor("red")}>빨강</button>
      <button onClick={() => changeColor("green")}>초록</button>
      <button onClick={() => changeColor("blue")}>파랑</button>
    </div>
  );
};

export default Say;
