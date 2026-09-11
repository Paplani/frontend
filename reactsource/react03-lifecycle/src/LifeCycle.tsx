import { useEffect, useState } from "react";

const MoveBox = ({ initPosition }: { initPosition: number }) => {
  console.log("LifeCycle ==> 1. 컴포넌트 실행(함수호출)");

  const [position, setPosition] = useState(initPosition);
  const [leftCount, setLeftCount] = useState(1);
  const boxStyle: React.CSSProperties = {
    background: "red",
    position: "relative",
    textAlign: "center",
    width: "100px",
    height: "100px",
    margin: "10px",
    lineHeight: "100px",
    left: `${position}px`,
  };

  const moveLeft = () => {
    setPosition(() => position - 20);
    setLeftCount(() => leftCount + 1);
  };

  const moveRight = () => {
    setPosition(() => position + 20);
  };

  //  의존성 배열부분을 아예 제외 : 컴포넌트가 업데이트 될 때마다 실행
  //  [] : 최초 한번만 실행되고 더 이상 실행되지 않음
  //  [배열, 변수, ...] : []안에 선언된 변수의 값이 바뀔 때만 실행

  //    useEffect(() => {
  //     A. 컴포넌트가 마운트 된 후 실행할 코드
  //     return () => {
  //       B. 컴포넌트 언마운트 되기 직전에 실행할 코드
  //     };
  //   }, [의존성배열]);

  useEffect(() => {
    console.log("userEffect 실행 ==> 3. 컴포넌트 마운트");
    return () => {
      console.log("userEffect 실행 ==> 4. 컴포넌트 언마운트");
    };
  },[leftCount]);

  console.log("return 실행 ==> 2. 렌더링(return 문)");
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h4 className="mb-4 text-center text-lg font-semibold">
        함수형 컴포넌트 생명주기
      </h4>
      {/* flex items-center justify-center : 기본 위치 중앙으로 */}
      <div className="h-36 flex overflow-hidden justify-center items-center rounded-md bg-gray-100 p-2">
        <div style={boxStyle}>{leftCount}</div>
      </div>
      <div className="mt-5 flex justify-center gap-3">
        <button
          className="bg-yellow-300 w-28 rounded-md px-4 py-2 font-semibold"
          onClick={moveLeft}
        >
          좌측이동
        </button>
        <button
          className="bg-yellow-300 w-28 rounded-md px-4 py-2 font-semibold "
          onClick={moveRight}
        >
          우측이동
        </button>
      </div>
    </div>
  );
};

const LifeCycle = () => {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <h2 className="mb-6 text-center text-2xl font-bold">
        React Hook - useEffect
      </h2>
      <MoveBox initPosition={0} />
    </div>
  );
};

export default LifeCycle;
