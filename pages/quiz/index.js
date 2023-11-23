import Layout from "@/components/ui/layout/layout";
import { getCategoryPaths } from "@/lib/questions";
import questionStyles from "@/styles/question.module.css";
import styles from "@/styles/quiz.module.css";
import CategoryGrid from "@/components/blocks/categoryGrid/categoryGrid";

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
        <CategoryGrid paths={paths} />
      </div>
    </Layout>
  );
};

export default Page;
