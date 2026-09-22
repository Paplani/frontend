import React, { useReducer } from "react";
import { initUser } from "../01-useState/user.types";
import { UserReducer } from "./user.reducer";

const UseReducerExam1 = () => {
  // const [state, dispatch] = userReducer(reducer, state초기값);
  // state : 상태 저장을 위한 변수
  // dispatch : 상태를 변경할 때 사용되는 함수 호출 (action 보내기)
  // reducer : 상태를 변경하기 위해 정의한 함수

  const [user, userDispatch] = useReducer(UserReducer, initUser);
  const { name, year, warning } = user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "name") {
      userDispatch({
        type: "SET_NAME",
        name: value,
      });
    } else {
      userDispatch({
        type: "SET_YEAR",
        year: Number(value),
      });
    }
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute left-1/2 top-[40%] flex flex-col w-125 max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 
      items-center border rounded-2xl border-gray-200 bg-white shadow-md p-4"
      >
        <div className="m-3">
          <h2 className="text-2xl text-center py-4 font-semibold">useReducer 확인하기</h2>
          <div
            className="mb-3 space-y-3 [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&_label]:w-18 [&_label]:shrink-0 [&_label]:text-right [&_label]:whitespace-nowrap 
          [&_input]:min-w-0 [&_input]:flex-1 [&_input]:rounded [&_input]:border [&_input]:border-gray-300 [&_input]:px-2 [&_input]:py-1"
          >
            <div>
              <label htmlFor="name">이름 :</label>
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                placeholder="이름 입력"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="year">출생년도 :</label>
              <input
                id="year"
                type="number"
                name="year"
                value={year === 0 ? "" : year}
                placeholder="년도 입력"
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="button"
            className="rounded bg-orange-500 px-4 py-2"
            onClick={() => userDispatch({ type: "RESET" })}
          >
            Reset
          </button>
        </div>
        <div>
          <ul>
            <li>Name : {name.toLowerCase()}</li>
            <li>Year : {year === 0 ? "" : year}</li>
            <li>{warning}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UseReducerExam1;
