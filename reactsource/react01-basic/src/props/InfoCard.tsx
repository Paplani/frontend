import styles from "./Card.module.css";

// 타입지정(외부에서도 사용가능)
export interface CardType {
  idx?: number; // ? : 있을수도 있고 없을수도 있음
  title: string;
  content?: string;
  author?: string;
}

const InfoCard = ({
  idx,
  title,
  content = "(No Content)",
  author,
}: CardType) => {
  return (
    <div className={styles.card} key={idx}>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>Author : {author}</p>
    </div>
  );
};

export default InfoCard;
