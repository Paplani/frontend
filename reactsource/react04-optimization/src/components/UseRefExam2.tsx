import { useEffect, useRef } from "react";

const UseRefExam2 = () => {
  const passRef1 = useRef<HTMLInputElement | null>(null);
  const passRef2 = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log("passRef1,2", passRef1, passRef2);
    // 렌더링 후 패스워드 1 입력상자에 포커싱
    passRef1.current?.focus();
  }, []);

  // 패스워드 검증 함수 정의
  const checkPassword = () => {
    // pass1, pass2의 값이 동일한지 확인
    // 동일하지 않다면 alert('비밀번호가 일치하지 않습니다.')
    // 동일하다면 alert('비밀번호 확인이 완료되었습니다')
    // 먼저 pass1, pass2 내용이 있는지 검사 alert('번호를 입력해주세요') / pass1 focus()

    // ?. : 있으면 접근하고 없으면 하지마
    if (!passRef1.current?.value || passRef2.current?.value == "") {
      passRef1.current?.focus();
      return alert("번호를 입력해주세요");
    }

    if (passRef1.current?.value === passRef2.current?.value) {
      alert("비밀번호 확인이 완료되었습니다");
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      if (passRef1.current && passRef2.current) {
        // 기존 값 제거
        passRef1.current.value == "";
        passRef2.current.value == "";
        passRef1.current?.focus();
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl">useRef 사용하기2</h2>
      <div className="flex flex-col gap-2 m-3">
        <form action="">
          <div>
            <label htmlFor="">패스워드1</label>
            <input
              type="password"
              name={passRef1}
              ref={passRef1}
              className="border-2 border-sky-200 outline-none focus:border-sky-700"
            />
          </div>
          <div>
            <label htmlFor="">패스워드2</label>
            <input type="password" name={passRef2} className="border border-black" />
          </div>
          <button
            type="button"
            className="border bg-orange-300 p-3"
            onClick={checkPassword}
          >
            패스워드 확인
          </button>
        </form>
      </div>
    </div>
  );
};

export default UseRefExam2;
