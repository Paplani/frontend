import { useReducer, useState } from "react";
import { bankReducer, initState, type BankActionType } from "./bank.reducer";

const UseReducerExam3 = () => {
  const [state, dispatch] = useReducer(bankReducer, initState);

  const [amount, setAmount] = useState("");

  const handleClick = (type: BankActionType) => {
    dispatch({
      type: type,
      payload: { amountMoney: Number(amount) },
    });
    setAmount("");
  };
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute left-1/2 top-[40%] flex flex-col gap-4 w-125 max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 
      items-center border rounded-2xl border-gray-200 bg-white shadow-md p-4"
      >
        <p>잔고 : {state.balance}</p>
        <div className="flex items-center justify-center w-full">
          <input
            className="min-w-0 w-32"
            type="number"
            value={amount}
            min={0}
            step={1000}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || Number(value) >= 0) {
                setAmount(value);
              }
            }}
          />
          <button
            className="shrink-0 bg-gray-400 p-2 mx-1"
            onClick={() => handleClick("DEP")}
          >
            입금
          </button>
          <button
            className="shrink-0 bg-gray-400 p-2 mx-1"
            onClick={() => handleClick("WIT")}
          >
            출금
          </button>
        </div>
      </div>
    </div>
  );
};

export default UseReducerExam3;
