import { useState } from "react";

const Switch = () => {
  // 문서 배경색 변경  black <=> white
  // document.body 사용

  const [isBlack, setIsBlack] = useState(false);

  // 조건식 ? 참일 때 실행할 값 또는 식 : 거짓일 때 실행할 값 또는 식
  const changeColor = () => {
    const bodyStyle = document.body.style;
    bodyStyle.backgroundColor = isBlack ? "white" : "black";
    setIsBlack(!isBlack);
  };

  return (
    <div>
      <button className="p-4 bg-amber-300" onClick={changeColor}>
        Toggle
      </button>
    </div>
  );
};

export default Switch;
