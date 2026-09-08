import BackComp from "./BackComp";
import FrontComp from "./FrontComp";

const MyComp = () => {
  const frontData: string[] = ["HTML5", "css3", "JavaScript", "React"];
  const backData: string[] = ["JAVA", "PYTHON", "ORACLE", "Node.js"];

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    alert((e.target as HTMLLIElement).innerHTML);
  };

  return (
    <div>
      {/* 자식 컴포넌트에 데이터와 제목을 props로 전달 */}
      <h2>React - Props</h2>
      <ol>
        <FrontComp
          frontData={frontData}
          frTitle={"프론트엔드"}
          onClick={handleClick}
        />
        <BackComp
          backData={backData}
          baTitle={"백엔드"}
          onClick={handleClick}
        />
      </ol>
    </div>
  );
};

export default MyComp;
