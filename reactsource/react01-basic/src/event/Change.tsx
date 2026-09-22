import { useState } from "react";

const Change = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const reset = () => {
    setMessage("");
    setUsername("");
  };

  return (
    <div>
      <h1>Change 이벤트</h1>
      <input
        type="text"
        name="message"
        value={message}
        placeholder="메세지"
        className="border"
        onChange={(e) => setMessage(e.target.value)}
      />
      <input
        type="text"
        name="username"
        value={username}
        placeholder="이름"
        className="border"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="mx-1 bg-red-200 p-3" onClick={reset}>
        초기화
      </button>
      {/* alert => 홍길동:메세지 */}
      <button
        className="mx-1 bg-red-200 p-3"
        onClick={() => alert(`${username} : ${message}`)}
      >
        확인
      </button>
    </div>
  );
};

export default Change;
