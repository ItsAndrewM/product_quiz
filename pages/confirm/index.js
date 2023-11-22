import Layout from "@/components/ui/layout/layout";
import questionStyles from "@/styles/question.module.css";
import Link from "next/link";
import styles from "@/styles/confirm.module.css";
import quizStyles from "@/styles/quiz.module.css";
import { getQuestionData } from "@/lib/questions";
import ConfirmedInput from "@/components/blocks/confirm/confirmedInput/confirmedInput";
export const getServerSideProps = async (context) => {
  const questions = await getQuestionData(context.query.category);
  return {
    props: {
      data: context.query || null,
      questions: questions || null,
    },
  };
};

const Page = ({ data, questions }) => {
  return (
    <Layout>
      <div className={questionStyles.wrapper}>
        <div className={questionStyles.titleWrapper}>
          <h1>Your Results for: {data.category}</h1>
        </div>
        <div>
          <ul>
            {questions.map((question) => {
              return (
                <ConfirmedInput
                  question={question}
                  data={data}
                  key={question.breadcrumb}
                />
              );
            })}
          </ul>
        </div>
        {data.category === "sails" ? (
          <div className={questionStyles.box}>
            Someone from our sales team will reach out shortly to provide you
            with a quote for a new sail.
          </div>
        ) : (
          <></>
        )}

        <div className={questionStyles.box}>
          <Link href={"/"} className={quizStyles.submit}>
            Start Again
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
