import AnswerInput from "@/components/blocks/answers/answerInput/answerInput";
import Layout from "@/components/ui/layout/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import breadCrumbStyles from "@/components/ui/navigation/breadcrumbs/breadcrumbs.module.css";
import styles from "@/styles/question.module.css";
import Breadcrumbs from "@/components/ui/navigation/breadcrumbs/breadcrumbs";
import {
  getCurrentQuestionData,
  getNextQuestionData,
  getPreviousQuestionData,
  getQuestionData,
  getQuestionPaths,
} from "@/lib/questions";

export const getStaticPaths = async () => {
  const paths = await getQuestionPaths();

  return {
    paths: paths.map((path) => `/quiz${path}`) ?? [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const allQuestionData = await getQuestionData(params.category);
  const data = await getCurrentQuestionData(params.category, params.question);
  const nextQuestion = await getNextQuestionData(
    params.category,
    params.question
  );
  const previousQuestion = await getPreviousQuestionData(
    params.category,
    params.question
  );
  return {
    props: {
      allQuestionData: allQuestionData || null,
      question: data || null,
      path: params.question || null,
      categoryPath: params.category || null,
      nextQuestion: nextQuestion || null,
      previousQuestion: previousQuestion || null,
    },
  };
};

const Page = ({
  allQuestionData,
  path,
  question,
  nextQuestion,
  previousQuestion,
  categoryPath,
}) => {
  const [state, setState] = useState();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = e.target.checkValidity();
    const form = e.target;
    const formData = new FormData(e.currentTarget);
    const validationMessages = Array.from(formData.keys()).reduce(
      (acc, key) => {
        acc[key] = form.elements[key].validationMessage;
        return acc;
      },
      {}
    );
    if (isValid) {
      // here you do what you need to do if is valid
      let data = Array.from(formData.keys()).reduce((acc, key) => {
        if (question.type === "checkbox") {
          const useCase = Array.from(formData.values());
          acc[key] = useCase;
        } else {
          acc[key] = formData.get(key);
        }
        return acc;
      }, {});
      const query = router.query;
      if (data) {
        if (!nextQuestion) {
          delete query.question;
          data = { ...query, ...data };
          router.push({
            pathname: "/confirm",
            query: data,
          });
          form.reset();
        } else {
          delete query.question;
          delete query.category;
          data = { ...query, ...data };
          router.push({
            pathname: !nextQuestion
              ? "/confirm"
              : `/quiz/${categoryPath}/${nextQuestion.breadcrumb}`,
            query: data,
          });
          form.reset();
        }
      }
    } else {
      setErrors(validationMessages);
    }
  };

  const handlePreviousButton = (e) => {
    e.preventDefault();
    const query = router.query;
    delete query.question;
    if (query) {
      router.push({
        pathname: `/quiz/${categoryPath}/${previousQuestion.breadcrumb}`,
        query: query,
      });
    }
  };

  return (
    <Layout>
      <div className={styles.wrapper}>
        <Breadcrumbs breadcrumbs={allQuestionData} path={path} />
        <div className={styles.titleWrapper}>
          <h1>{path}</h1>
          <p>{question.title}</p>
          <p>{question.content}</p>
        </div>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <ul className={styles.list}>
              {question.questions.map((val, index) => {
                return (
                  <AnswerInput
                    key={index}
                    name={val.name}
                    title={val.title}
                    type={question.type}
                    value={val.value}
                    defaultChecked={index === 0 ? true : false}
                  />
                );
              })}
            </ul>
            <div className={styles.box}>
              {previousQuestion.name === "home" ? (
                <div className={styles.buttonBox}>
                  <span
                    className={`${breadCrumbStyles.chevron} ${breadCrumbStyles.left}`}
                  ></span>
                  <Link href={`${previousQuestion.slug}`}>home</Link>
                </div>
              ) : (
                <div>
                  <Link
                    href={`/quiz/${categoryPath}/${previousQuestion.slug}`}
                    onClick={handlePreviousButton}
                  >
                    back
                  </Link>
                </div>
              )}
              <input
                type="submit"
                value={"Next Question"}
                className={styles.submit}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
