// 기본 컴포넌트 예제: 자체 데이터를 표시합니다.
const FrontComp = () => {
  const frontData = ["HTML5", "CSS3", "JavaScript", "React"];
  const liRows = frontData.map((name) => <li key={name}>{name}</li>);
  return (
    <li>
      프론트엔드
      <ul>{liRows}</ul>
    </li>
  );
};

export default FrontComp;
