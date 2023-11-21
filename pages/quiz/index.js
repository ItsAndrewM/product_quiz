import Layout from "@/components/ui/layout/layout";
import { getCategoryPaths } from "@/lib/questions";
import breadCrumbStyles from "@/components/ui/navigation/breadcrumbs/breadcrumbs.module.css";
import questionStyles from "@/styles/question.module.css";
import styles from "@/styles/quiz.module.css";
import Link from "next/link";
import Image from "next/image";

export const getServerSideProps = async (context) => {
  const paths = await getCategoryPaths();
  return {
    props: {
      paths: paths || null,
    },
  };
};

const Page = ({ paths }) => {
  return (
    <Layout>
      <div className={questionStyles.wrapper}>
        <div className={styles.container}>
          <h1>Product Quiz</h1>
          <p>
            Begin by selecting a product category. What kind of product are you
            looking for?
          </p>
        </div>
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
      </div>
    </Layout>
  );
};

export default Page;
