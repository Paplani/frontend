import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";

// 도메인 select에 뿌릴 목록 (여기만 수정하면 옵션이 늘거나 줆)
const EMAIL_DOMAINS = ["gmail.com", "naver.com", "daum.net", "kakao.com"];
// "직접입력"이 선택된 상태를 표시하는 마커 값 (실제 도메인 아님)
const CUSTOM_DOMAIN = "custom";

const Signup = () => {
  type formType = {
    username: string;
    emailId: string;
    // select에서 고른 값 (도메인 문자열 또는 CUSTOM_DOMAIN 마커)
    emailDomain: string;
    // "직접입력" 모드일 때 사용자가 타이핑한 실제 도메인
    customDomain: string;
  };

  const [form, setForm] = useState<formType>({
    username: "",
    emailId: "",
    emailDomain: EMAIL_DOMAINS[0],
    customDomain: "",
  });

  // 직접입력을 골랐을 때만 도메인 텍스트 입력창을 보여줌
  const isCustomDomain = form.emailDomain === CUSTOM_DOMAIN;

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // 확인작업
    const { username, emailId } = form;
    // 직접입력 모드면 customDomain, 아니면 select 선택값을 최종 도메인으로 채택
    const domain = isCustomDomain ? form.customDomain : form.emailDomain;
    // 아이디 + 도메인을 합쳐서 최종 이메일 문자열 완성
    const email = emailId && domain ? `${emailId}@${domain}` : "";

    if (username && email) {
      console.log(username, email);
    } else {
      alert("모든 값을 채워주세요");
    }
  };

  // 이름 / 이메일 아이디 / 직접입력 도메인 - 공용 핸들러
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 도메인 select 전용 (HTMLSelectElement라 input용 공용 onChange와 타입이 안 맞아 따로 분리)
  const onDomainChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setForm({
      ...form,
      emailDomain: e.target.value,
    });
  };

  return (
    <div>
      <h1>Submit 이벤트</h1>
      {/* 버튼에 onClick을 따로 걸 필요가 없다. type="submit"인 버튼을 클릭하면 자기가 속한 <form>의 submit 발생시킴 */}
      <form action="" method="post" onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={onChange}
          placeholder="이름"
          className="border"
        />
        <span className="inline-flex items-center gap-1">
          <input
            type="text"
            name="emailId"
            value={form.emailId}
            onChange={onChange}
            placeholder="이메일 아이디"
            className="border"
          />
          <span>@</span>
          {/* isCustomDomain에 따라 select ↔ 직접입력 input 중 하나만 보여줌 */}
          {isCustomDomain ? (
            <input
              type="text"
              name="customDomain"
              value={form.customDomain}
              onChange={onChange}
              placeholder="도메인 입력"
              className="border"
            />
          ) : (
            <select
              name="emailDomain"
              value={form.emailDomain}
              onChange={onDomainChange}
              className="border"
            >
              {/* EMAIL_DOMAINS 배열을 옵션 목록으로 변환 */}
              {EMAIL_DOMAINS.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
              {/* 목록 마지막에 직접입력 옵션 추가 */}
              <option value={CUSTOM_DOMAIN}>직접입력</option>
            </select>
          )}
        </span>
        <button className="mx-1 bg-red-200 p-3" type="submit">
          확인
        </button>
      </form>
    </div>
  );
};

export default Signup;
