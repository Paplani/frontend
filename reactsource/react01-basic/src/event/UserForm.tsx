import { useState, type ChangeEventHandler } from "react";

const WriteForm = () => {
  const roles = ["user", "admin", "guest"];
  // form 안 내용들을 한꺼번에 관리

  const [form, setForm] = useState({
    username: "",
    isSubscr: false,
    role: "user",
  });

  const { username, isSubscr, role } = form;

  // input(text/checkbox)와 select를 모두 처리하는 공용 핸들러
  // select엔 checked가 없어서 'checked' in e.target으로 좁혀서(narrowing) 안전하게 접근
  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    const nextValue = "checked" in e.target ? e.target.checked : value;
    setForm({
      ...form,
      [name]: nextValue,
    });
  };

  return (
    <div className="border-2 py-4 border-gray-400 rounded-sm">
      <form action="">
        {/* username 에서 입력 값 보여주기  Name : 홍길동 (Subscribed) */}
        <div>
          Name : {username}
          {isSubscr && "(Subscribed)"}
        </div>
        {/* option에서 선택한 값을 보여주기 */}
        <div>Role : {role}</div>
        <div>
          <label htmlFor="">이름 </label>
          <input
            type="text"
            name="username"
            className="border border-gray-400 px-3"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">구독 </label>
          <input
            type="checkbox"
            name="isSubscr"
            checked={isSubscr}
            onChange={handleChange}
          />
        </div>
        {/* roles 의 값을 option으로 보여주기 */}
        <select name="role" className="mx-3" onChange={handleChange}>
          {roles.map((role, idx) => (
            <option key={idx} value={role}>
              {role}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default WriteForm;
