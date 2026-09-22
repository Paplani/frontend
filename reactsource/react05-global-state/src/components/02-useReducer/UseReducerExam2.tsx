import { useReducer } from "react";
import { counterReducer, initState, type CountActionType } from "./counter.reducer";

const UseReducerExam2 = () => {
  const [state, dispatch] = useReducer(counterReducer, initState);

  const handleClick = (type: CountActionType, value: number) => {
    dispatch({
      type: type,
      payload: { value },
    });
  };
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute left-1/2 top-[40%] flex w-125 max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 
      items-center border rounded-2xl border-gray-200 bg-white shadow-md p-4"
      >
        <p>Count : {state.count}</p>
        <button className="bg-gray-400 p-2 mx-1" onClick={() => handleClick("INC", 1)}>
          +1
        </button>
        <button className="bg-gray-400 p-2 mx-1" onClick={() => handleClick("DEC", 1)}>
          -1
        </button>
        <button className="bg-gray-400 p-2 mx-1" onClick={() => handleClick("DEC", 2)}>
          +2
        </button>
        <button className="bg-gray-400 p-2 mx-1" onClick={() => handleClick("DEC", 2)}>
          -2
        </button>
      </div>
    </div>
  );
};

export default UseReducerExam2;
