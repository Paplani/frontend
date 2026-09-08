import { useState } from "react";

const InputSample = () => {
  // input 에 사용자가 입력을 하면 h2에 값을 보여주기
  // 초기화 클릭시 input에 있는 내용 제거

  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={() => setText("")}>초기화</button>
      <h2>현재값 : {text}</h2>
    </div>
  );
};

export default InputSample;
