import Layout from "@/components/ui/layout/layout";
import { breadcrumbs } from "@/data/breadcrumbs/breadcrumbs";
import questionStyles from "@/styles/question.module.css";
import Link from "next/link";
import styles from "@/styles/confirm.module.css";
export const getServerSideProps = async (context) => {
  return {
    props: {
      data: context.query || null,
    },
  };
};

const Page = ({ data }) => {
  return (
    <Layout>
      <div className={questionStyles.wrapper}>
        <div className={questionStyles.titleWrapper}>
          <h1>Your Results</h1>
        </div>
        <div>
          <ul></ul>
        </div>
        <div className={questionStyles.box}></div>
      </div>
    </Layout>
  );
};

export default Page;
