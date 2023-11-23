import questionStyles from "@/styles/question.module.css";
import ProductCard from "./productCard/productCard";

const ProductGrid = ({ products }) => {
  return (
    <ul className={questionStyles.list}>
      {products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </ul>
  );
};

export default ProductGrid;
