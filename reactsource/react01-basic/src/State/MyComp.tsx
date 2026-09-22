import { useState } from "react";
import TopComp from "./TopComp";

// 리엑트는 참조(주소)만 비교함 => 얕은 비교
// 따라서 복제를 해서 새롭게 값을 바꿔줘야 주소가 변하고 리렌더링함.

const MyComp = () => {
  const [myData, setMyData] = useState({
    frontData: ["HTML5", "css3", "JavaScript", "React"],
    backData: ["JAVA", "PYTHON", "ORACLE", "Node.js"],
  });

  const frontClick = () => {
    // frontData 에 새로운 내용 추가

    setMyData((prev) => ({
      ...prev,
      frontData: [...prev.frontData, "TypeScript"],
    }));
  };

  const backClick = () => {
    // frontData 에 새로운 내용 추가

    const newBack = [...myData.backData, "SpringBoot"];
    const newMyData = { ...myData, backData: newBack };

    setMyData(newMyData);
  };

  return (
    <div>
      {/* 자식 컴포넌트에 데이터와 제목을 props로 전달 */}
      <h2>React - 얕은 비교</h2>
      <TopComp frontData={myData.frontData} backData={myData.backData} />
      <button className="p-4 border-2 border-indigo-400" onClick={frontClick}>
        Add Front
      </button>
      <button className="p-4 border-2 border-pink-400" onClick={backClick}>
        Add Back
      </button>
      <button>Add Back</button>
    </div>
  );
};

export default MyComp;
