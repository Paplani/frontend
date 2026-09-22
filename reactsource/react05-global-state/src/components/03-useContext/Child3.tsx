import { useCount } from "./CommonContext";

// UseContextExam2 자식
// Child3,4   child4는 3의 자식
// isOn => 상태변수 공유(true, false)
// Child3 에서 isOn 출력
// Child4 버튼으로 isOn 출력

const Child4 = () => {
  const context = useCount();
  const { isOn, onToggle } = context;

  const childStyle: React.CSSProperties = {
    color: isOn ? "#FF6B6B" : "#4DFAF4",
  };

  return (
    <div className="flex flex-col ">
      <h2 style={childStyle} className="font-bold text-3xl text-center mb-3">
        Child4
      </h2>
      <button
        className="border rounded-xl px-4 shadow-sm transition-transform duration-200 hover:-translate-y-px"
        onClick={onToggle}
      >
        색상 변경 : {String(isOn)}
      </button>
    </div>
  );
};

const Child3 = () => {
  return (
    <div>
      <h2 className="text-3xl text-center">Is Child3</h2>
      <Child4 />
    </div>
  );
};

export default Child3;
