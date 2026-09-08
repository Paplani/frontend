import { useState } from "react";

const NickName = () => {
  // 닉네임에 입력한 내용이 입력된 닉네임에도 나오게

  const [nickName, setNickName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const changeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="">닉네임</label>
        <input type="text" onChange={changeNickName} value={nickName} />
      </div>
      <div>
        <label htmlFor="">입력된 닉네임</label>
        <input type="text" value={nickName} />
      </div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "숨기기" : "보이기"}
      </button>
      {/* && : 조건부 렌더링할때 */}
      {/* isVisible 이 true 일때만 p태그 보여줌 */}
      {isVisible && <p>안녕하세요!!</p>}
    </div>
  );
};

export default NickName;
