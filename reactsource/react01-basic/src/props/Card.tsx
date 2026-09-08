import InfoCard, { type CardType } from "./InfoCard";

const Card = () => {
  const cards: CardType[] = [
    {
      idx: 1,
      title: "Props in React",
      content: "Props pass data from one component to another.",
      author: "Alice",
    },
    {
      idx: 2,
      title: "React Compositio",
      content: "Props pass data from one component to another.",
      author: "Charlie",
    },
    {title:"React Props"},
  ];

  return (
    <div>
      {/* 자바스크립트 코드는 {} 안에! */}
      {/* map 은 배열인 것에만 사용 가능하다 */}
      {/* 중괄호 {}는 여러 명령을 실행하는 공간이에요. 결과를 돌려주려면 return을 직접 써야 합니다 */}
      {/* 소괄호 ()는 반환할 값을 묶어요. return을 생략하고 JSX를 바로 반환할 수 있습니다. */}
      {/* 다만 중간에 변수 선언이나 다른 처리가 필요하면 **중괄호 + return**을 사용해요. */}
      {cards.map((card) => (
        <InfoCard
          key={card.idx}
          title={card.title}
          content={card.content}
          author={card.author}
        />
      ))}
    </div>
  );
};

export default Card;

// Card.tsx 가 부모, InfoCard.tsx 가 자식
