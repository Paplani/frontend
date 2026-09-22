import { useCallback, useEffect, useState } from "react";

type DivBoxType = {
  fnBoxStyle: () => void;
  numberVar: number;
};

const DivBox = ({ fnBoxStyle, numberVar }: DivBoxType) => {
  const [myStyle, setMyStyle] = useState({});

  useEffect(() => {
    console.log("박스 스타일 변경");
    setMyStyle(fnBoxStyle);
  }, [fnBoxStyle]);

  return <div style={myStyle}>{numberVar}</div>;
};

const UseCallbackExam = () => {
  // 지금 경우는 reactCompiler 막고 내가 직접 제어하겠다는 뜻
  "use no memo";

  const [boxSize, setBoxSize] = useState(100);
  const [boxColor, setBoxColor] = useState(0);
  const [number, setNumber] = useState(0);
  const colorArr = ["red", "green", "blue"];

  //   const fnBoxStyle = () => {
  //     return {
  //       backgroundColor: `${colorArr[boxColor]}`,
  //       width: `${boxSize}px`,
  //       height: `${boxSize}px`,
  //       textAlign: "center",
  //       lineHeight: `${boxSize}px`,
  //     };
  //   };

  //   useCallback() 적용 코드
  const fnBoxStyle = useCallback(() => {
    return {
      backgroundColor: `${colorArr[boxColor]}`,
      width: `${boxSize}px`,
      height: `${boxSize}px`,
      textAlign: "center",
      lineHeight: `${boxSize}px`,
    };
  }, [boxSize, boxColor]);

  return (
    <div className="m-3">
      <h2 className="text-2xl">useCallback 사용하기</h2>
      <button
        className="border border-orange-500 p-2 m-2"
        onClick={() => setBoxSize(boxSize + 10)}
      >
        크기 증가
      </button>
      <button
        className="border border-orange-500 p-2 m-2"
        onClick={() => setBoxColor((boxColor + 1) % 3)}
      >
        컬러 변경
      </button>
      <button
        className="border border-orange-500 p-2 m-2"
        onClick={() => setNumber(number + 1)}
      >
        숫자 변경
      </button>
      {/* 자식 컴포넌트에 함수를 props 로 넘길 수 있음 */}
      <DivBox fnBoxStyle={fnBoxStyle} numberVar={number} />
    </div>
  );
};

export default UseCallbackExam;
