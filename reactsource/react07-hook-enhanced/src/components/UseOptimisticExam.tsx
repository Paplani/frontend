import { useOptimistic, useRef, useState } from "react";
import { initMessages, type Message, type ThreadProps } from "../types";

const Thread = ({ messages, sendMessage }: ThreadProps) => {
  // 폼 요성 지정 변수
  const formRef = useRef<HTMLFormElement>(null);

  // 낙관적 상태 업데이트
  const [optimisticMessages, addOptimisticMessages] = useOptimistic<Message[], string>(
    messages,
    (state, newMessage) => [...state, { text: newMessage, sending: true }],
  );

  //submit 시 호출되는 함수
  async function formAction(formData: FormData) {
    const message = formData.get("message");
    if (typeof message !== "string") {
      return;
    }
    // 메세지를 UI에 즉시 추가
    addOptimisticMessages(message);
    formRef.current?.reset(); // form 내용 지우기
    // 메세지를 서버로 전송
    await sendMessage(formData);
  }

  return (
    <div>
      {/* 메세지 보여주기 */}
      {optimisticMessages.map((message, idx) => (
        <div key={idx}>
          {message.text}
          {!!message.sending && <small>(Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input
          type="text"
          name="message"
          placeholder="메세지를 입력해주세요"
          className="border p-2"
        />
        <button type="submit" className="border p-2 bg-amber-300">
          Send
        </button>
      </form>
    </div>
  );
};

// 메세지를 서버로 전송하는 것을 표현한 함수 정의
// 실제 네트워크 요청처럼 보이도록 1초후 전달받은 메세지 반환
async function deliverMessage(message: string) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}

const UseOptimisticExam = () => {
  const [messages, setMessages] = useState<Message[]>([initMessages]);

  async function sendMessage(formData: FormData) {
    const message = formData.get("message");
    if (typeof message !== "string") {
      return;
    }

    // 메세지 서버로 전송 함수 호출
    const sendMessage = await deliverMessage(message);
    // 화면 변경
    setMessages((messages) => [...messages, { text: sendMessage, sending: false }]);
  }

  return (
    <div>
      <h2 className="text-3xl">UseOptimistic 사용하기</h2>
      <Thread messages={messages} sendMessage={sendMessage} />
    </div>
  );
};

export default UseOptimisticExam;
