import AnswerInput from "@/components/blocks/answers/answerInput/answerInput";
import Layout from "@/components/ui/layout/layout";
import { breadcrumbs } from "@/data/breadcrumbs/breadcrumbs";
import { questions } from "@/data/questions/questions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import breadCrumbStyles from "@/components/ui/navigation/breadcrumbs/breadcrumbs.module.css";
import styles from "@/styles/question.module.css";

export const getStaticPaths = async () => {
  return {
    paths: breadcrumbs.map((path) => `/quiz/${path.slug}`) ?? [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const index = breadcrumbs.findIndex((item) => item.slug === params.question);
  const data = questions.at(index);
  const nextQuestion = breadcrumbs.at(index + 1) ?? null;
  const previousQuestion =
    index !== 0 ? breadcrumbs.at(index - 1) : { name: "home", slug: "/" };
  return {
    props: {
      path: params.question || null,
      question: data || null,
      nextQuestion: nextQuestion || null,
      previousQuestion: previousQuestion || null,
    },
  };
};

const Page = ({ path, question, nextQuestion, previousQuestion }) => {
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
        if (path === "purpose") {
          const useCase = Array.from(formData.values());
          acc[key] = useCase;
        } else {
          acc[key] = formData.get(key);
        }
        return acc;
      }, {});
      const query = router.query;
      delete query.question;
      data = { ...query, ...data };
      if (data) {
        router.push({
          pathname: !nextQuestion ? "/confirm" : `/quiz/${nextQuestion.slug}`,
          query: data,
        });
        form.reset();
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
        pathname: `/quiz/${previousQuestion.slug}`,
        query: query,
      });
    }
  };
  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <h1>{path}</h1>
          <p>{question.title}</p>
        </div>
        <div>
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
                    href={`/quiz/${previousQuestion.slug}`}
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
