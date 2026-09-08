import { useState } from "react";

const InputMultipleSample = () => {
  // input 여러개를 하나의 state로 관리
  // {name: '홍길동', nickname:'의적'}
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });

  // 구조 분해 할당
  // 현재 state 정보를 꺼내놓는다
  const { name: userName, nickname: userNickname } = inputs;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이벤트 대상은 누구인가?
    // const { 원래속성이름: 새변수이름 } = 객체;      const {가져올거: 내가 쓸 이름} = 객체;
    const { name: inputName, value: inputValue } = e.target;

    // const inputName = e.target.name;
    // const inputValue = e.target.value;

    // 새로운 정보로 덮어쓰기 => 업데이트
    setInputs({
      ...inputs,
      [inputName]: inputValue,
    });
  };
  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
  };

  return (
    <div>
      <input type="text" name="name" value={userName} onChange={handleChange} />
      <input
        type="text"
        name="nickname"
        value={userNickname}
        onChange={handleChange}
      />
      <button onClick={onReset}>초기화</button>
      <h2>
        현재값 : {userName}({userNickname})
      </h2>
    </div>
  );
};

export default InputMultipleSample;
