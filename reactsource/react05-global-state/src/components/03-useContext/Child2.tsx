import { useContext } from "react";
import { CountContext } from "./CommonContext";

const Child2 = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("CountContext is Null");
  }

  const { count, increaseCount } = context;

  return (
    <div>
      <h2 className="text-3xl">Child2</h2>
      <p>count : {count}</p>
      <button className="border px-4" onClick={increaseCount}>
        증가
      </button>
    </div>
  );
};

const Child1 = () => {
  return (
    <div>
      <h2 className="text-3xl">Child1</h2>
      <Child2 />
    </div>
  );
};

export default Child1;

// UseContextExam2 자식
// Child3,4   child4는 3의 자식
// isOn => 상태변수 공유(true, false)
// Child3 에서 isOn 출력
// Child4 버튼으로 isOn 출력



