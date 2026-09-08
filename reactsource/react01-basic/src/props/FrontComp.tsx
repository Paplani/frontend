// props 라는 변수로 한꺼번에 받기

// const FrontComp = (props: { propData1: string[]; frTitle: string }) => {
//   const liRows = [];
//   for (let i = 0; i < props.propData1.length; i++) {
//     // 리엑트가 리스트를 렌더링 할 떄 각 항목을 고유하게 식별할 수 있도록
//     // Key 속성 지정!
//     liRows.push(<li key={i}>{props.propData1[i]}</li>);
//   }

//   return (
//     <li>
//       {props.frTitle}
//       <ul>{liRows}</ul>
//     </li>
//   );
// };

type FrontCompProps = {
  frontData: string[];
  frTitle: string;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
};

// 부모가 전달한 props를 구조 분해해서 받습니다.
const FrontComp = ({ frontData, frTitle, onClick }: FrontCompProps) => {
  const liRows = [];
  for (let i = 0; i < frontData.length; i++) {
    // key는 React가 각 목록 항목을 식별하는 데 사용합니다.
    liRows.push(
      <li key={i} onClick={onClick}>
        {frontData[i]}
      </li>,
    );
  }

  return (
    <li>
      {frTitle}
      <ul>{liRows}</ul>
    </li>
  );
};

export default FrontComp;
