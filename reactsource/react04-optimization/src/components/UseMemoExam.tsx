import { useMemo, useState } from "react";

const isPrime = (num: number) => {
  console.log("소수 판단 중...");
  for (let i = 2; i < 1234567809; i++) {
    // 실행 비용이 높은 연산으로 가정
  }

  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const UseMemoExam = () => {
  // React Compiler 동작 중지
  // "use no memo" => 내가 직접 관리함.
  "use no memo";

  const [number, setNumber] = useState(0);
  const [text, setText] = useState("");

  // useMemo 훅을 사용하기 전
  //   const checkPrime = isPrime(number);

  // useMemo 훅을 사용한 후 => number 값이 변경될때만 isPrime 실행됨
  const checkPrime = useMemo(() => isPrime(number), [number]);

  return (
    <div className="m-3">
      <div>
        <h2 className="text-2xl">useMemo 사용하기</h2>
        <input
          type="number"
          className="border border-black"
          placeholder="소수 판단할 숫자 입력"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />
      </div>
      <p>
        정수 {number}는 {checkPrime ? "소수 O" : "소수 X"}
      </p>
      <input
        type="text"
        className="border border-black"
        placeholder="이름 입력(소수 판단과 무관)"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>입력한 이름:{text}</p>
    </div>
  );
};

export default UseMemoExam;
