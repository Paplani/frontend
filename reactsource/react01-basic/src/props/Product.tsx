import ProductCard from "./ProductCard";

const Product = () => {
  const product = {
    name: "Laptop",
    price: 123.4567,
  };

  return (
    <div>
      <ProductCard
        name={product.name}
        price={product.price}
        formatPrice={(p) => `$${p.toFixed(2)}`}
      />
    </div>
  );
};

export default Product;
