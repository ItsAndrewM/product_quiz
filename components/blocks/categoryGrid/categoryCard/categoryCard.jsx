import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/quiz.module.css";

const CategoryCard = ({ path }) => {
  return (
    <li key={path} className={`${styles.listItem} `}>
      <Link href={`/quiz/${path}`} className={styles.link}>
        <Image
          src={`/images/${path}.jpg`}
          width={200}
          height={200}
          alt={path}
          style={{ objectFit: "cover" }}
        />
      </Link>
      <Link href={`/quiz/${path}`} className={styles.submit}>
        {path}
      </Link>
    </li>
  );
};

export default CategoryCard;
