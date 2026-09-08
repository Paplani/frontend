import styles from "./Card.module.css";

const ProductCard = ({
  name,
  price,
  formatPrice,
}: {
  name: string;
  price: number;
  formatPrice: (p: number) => string;
}) => {
  const displayPrice = formatPrice(price);

  return (
    <div className={styles.card}>
      <h2>{name}</h2>
      <p>
        {price} : {displayPrice}
      </p>
    </div>
  );
};

export default ProductCard;
