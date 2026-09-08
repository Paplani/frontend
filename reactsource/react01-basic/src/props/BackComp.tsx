type BackCompProps = {
  backData: string[];
  baTitle: string;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
};

const BackComp = ({ backData, baTitle, onClick }: BackCompProps) => {
  const liRows = [];
  for (let i = 0; i < backData.length; i++) {
    liRows.push(
      <li key={i} onClick={onClick}>
        {backData[i]}
      </li>,
    );
  }

  return (
    <div>
      <li>{baTitle} </li>
      <ul>{liRows}</ul>
    </div>
  );
};

export default BackComp;

;