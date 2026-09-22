import React, { useState } from "react";
import { initUser, type UserType } from "./user.types";

const UseStateExam = () => {
  const [user, setUser] = useState<UserType>(initUser);
  const { name, year, warning } = user;

  // name, year 변경 시 공통의 함수 호출
  // const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // 누구로부터 이벤트가 왔느냐
  //   const { name, value } = e.target;
  //   setUser({
  //     ...user,
  //     [name]: value === "year" ? Number(value.trim()) : value.trim().toLowerCase(),
  //   });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setUser((prev) => ({
        ...prev,
        name: value.trim().toLowerCase(),
      }));
    } else {
      // year 기준으로 올해 년도에서 뺀 나이가 18세 이상인지 확인
      // 18세 미만 : 18세 이상이여아 합니다 => warning
      const inputYear = value === "" ? 0 : parseInt(value);
      const age = new Date().getFullYear() - inputYear;
      if (age < 0) return alert("현재 년도보다 이전인 본인이 태어난 년도를 적어주세요");

      setUser((prev) => ({
        ...prev,
        year: inputYear,
        warning: inputYear !== 0 && age < 18 ? "18세 이상이여야 합니다." : "",
      }));
    }
  };

  const resetValue = () => {
    setUser({
      name: "",
      year: 0,
      warning: "",
    });
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute left-1/2 top-[40%] flex flex-col w-125 max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 items-center border rounded-2xl border-gray-200 bg-white shadow-md p-4">
        <div className="m-3">
          <h2 className="text-2xl text-center py-4 font-semibold">useState 확인하기</h2>
          <div className="mb-3 space-y-3 [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&_label]:w-18 [&_label]:shrink-0 [&_label]:text-right [&_label]:whitespace-nowrap [&_input]:min-w-0 [&_input]:flex-1 [&_input]:rounded [&_input]:border [&_input]:border-gray-300 [&_input]:px-2 [&_input]:py-1">
          <div>
            <label htmlFor="name">
              이름 :{" "}
            </label>
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
            <label htmlFor="year">
              출생년도 :{" "}
            </label>
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
            onClick={resetValue}
          >
            Reset
          </button>
        </div>
        <div>
          <ul>
            <li>Name : {name}</li>
            <li>Year : {year === 0 ? "" : year}</li>
            <li>{warning}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UseStateExam;
