import quizStyles from "@/styles/quiz.module.css";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <li key={product.id} className={`${quizStyles.listItem} `}>
      <Link
        href={`${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`}
        className={quizStyles.link}
      >
        <Image
          src={
            !product.images.length
              ? `https://placehold.co/${200}x${200}/jpeg`
              : product.images[0].file.url
          }
          width={200}
          height={200}
          alt={product.name}
          style={{ objectFit: "cover" }}
        />
      </Link>
      <Link
        href={`${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`}
        className={quizStyles.submit}
      >
        {product.name}
      </Link>
    </li>
  );
};

export default ProductCard;
