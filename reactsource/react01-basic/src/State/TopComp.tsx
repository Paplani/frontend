interface TopCompProps {
  frontData: string[];
  backData: string[];
}

const TopComp = ({ frontData, backData }: TopCompProps) => {
  return (
    <div>
      <ol>
        <li>프론트 엔드</li>
        {/* frontData 보여주기 */}
        <ul>
          {frontData.map((front, idx) => (
            <li key={idx}>{front}</li>
          ))}
        </ul>
        <li>벡엔드</li>
        <ul>
          {backData.map((back, idx) => (
            <li key={idx}>{back}</li>
          ))}
        </ul>
      </ol>
    </div>
  );
};

export default TopComp;
