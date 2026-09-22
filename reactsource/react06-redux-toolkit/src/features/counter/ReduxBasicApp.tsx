import { useAppDispatch, useAppSelector } from "../../hooks";
import { decrement, increment, reset } from "./counterSlice";

const ReduxBasicApp = () => {
  // 상태 변수 가져오기
  const count = useAppSelector((state) => state.myCounter.value);

  // reducer 함수 호출
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2 className="text-3xl">Redux 사용법</h2>
      <p>Count : {count}</p>
      <button className="bg-gray-400 p-2 mx-1" onClick={() => dispatch(increment())}>
        +1
      </button>
      <button className="bg-gray-400 p-2 mx-1" onClick={() => dispatch(decrement())}>
        -1
      </button>
      <button className="bg-gray-400 p-2 mx-1" onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
};

export default ReduxBasicApp;
