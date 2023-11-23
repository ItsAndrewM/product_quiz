import styles from "@/styles/quiz.module.css";
import questionStyles from "@/styles/question.module.css";
const CategoryGrid = ({ paths }) => {
  return (
    <ul className={questionStyles.list}>
      {paths.map((path) => {
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
      })}
    </ul>
  );
};

export default CategoryGrid;
