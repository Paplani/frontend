import { useState } from "react";

const Counter = () => {
  // 함수
  // let count = 0;

  // set* 함수 : 변수값을 변경하는데 사용, 화면을 리페인팅
  const [count, setCount] = useState(0);

  // const increase = () => {
  //   setCount(count + 1);
  //   console.log(count + 1);
  // };
  // const decrease = () => {
  //   setCount(count - 1);
  //   console.log(count - 1);
  // };

  // const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  return (
    <div className="grid grid-cols-2 gap-4 w-sm m-3">
      <h1 className="text-3xl col-span-2">{count}</h1>
      <button
        type="button"
        className="increase p-4 bg-orange-500"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
      <button type="button" className="decrease p-4 bg-red-500" onClick={decrease}>
        -
      </button>
    </div>
  );
};

export default Counter;
