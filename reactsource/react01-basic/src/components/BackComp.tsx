// 기본 컴포넌트 예제: 자체 데이터를 표시합니다.
const BackComp = () => {
  const backData = ["JAVA", "PYTHON", "ORACLE", "Node.js"];
  const liRows = backData.map((name) => <li key={name}>{name}</li>);

  return (
    <li>
      백엔드
      <ul>{liRows}</ul>
    </li>
  );
};

export default BackComp;
