import Layout from "@/components/ui/layout/layout";
import { questions } from "@/data/questions/questions";
import { breadcrumbs } from "@/data/breadcrumbs/breadcrumbs";
import questionStyles from "@/styles/question.module.css";
import Link from "next/link";
import styles from "@/styles/confirm.module.css";
export const getServerSideProps = async (context) => {
  console.log(questions);
  return {
    props: {
      data: context.query || null,
      questions: questions || null,
      breadcrumbs: breadcrumbs || null,
    },
  };
};

const Page = ({ data, questions, breadcrumbs }) => {
  return (
    <Layout>
      <div className={questionStyles.wrapper}>
        <div className={questionStyles.titleWrapper}>
          <h1>Your Results</h1>
          {/* <p>{question.title}</p> */}
        </div>
        <div>
          <ul>
            {Object.keys(data).map((val, index) => {
              return (
                <li key={index}>
                  {/* {breadcrumbs.at(index).description}:{" "} */}
                  {breadcrumbs.at(index).name}:{" "}
                  {/* {data[val] === "true" ? "An outboard motor" : data[val]} */}
                  {data[val]}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={questionStyles.box}>
          <Link
            href={"/quiz/purpose"}
            className={`${styles.button} ${questionStyles.submit}`}
          >
            Start Over
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
