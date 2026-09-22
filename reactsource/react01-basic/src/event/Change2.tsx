import { useState } from "react";

const Change2 = () => {
  const [user, setUser] = useState({
    username: "",
    message: "",
  });

  const { username, message } = user;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const reset = () => setUser({ username: "", message: "" });

  return (
    <div>
      <h1>Change 이벤트</h1>
      <input
        type="text"
        name="message"
        value={message}
        placeholder="메세지"
        className="border"
        onChange={onChange}
      />
      <input
        type="text"
        name="username"
        value={username}
        placeholder="이름"
        className="border"
        onChange={onChange}
      />
      <button className="mx-1 bg-red-200 p-3" onClick={reset}>
        초기화
      </button>
      {/* alert => 홍길동:메세지 */}
      <button
        className="mx-1 bg-sky-200 p-3"
        onClick={() => alert(`${username} : ${message}`)}
      >
        확인
      </button>
    </div>
  );
};

export default Change2;
