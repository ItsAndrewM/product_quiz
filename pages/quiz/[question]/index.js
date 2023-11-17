import Layout from "@/components/ui/layout/layout";
import { breadcrumbs } from "@/data/breadcrumbs/breadcrumbs";
import { questions } from "@/data/questions/questions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

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
  console.log(previousQuestion);
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
  console.log(previousQuestion);
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
        acc[key] = formData.get(key);
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
      }
      //   try {
      //     const response = await fetch("/api/contact-us", {
      //       method: "post",
      //       body: new URLSearchParams(data),
      //     });
      //     if (!response.ok) {
      //       throw new Error(`Invalid response: ${response.status}`);
      //     }
      //     alert("Thanks for contacting us, we will get back to you soon!");
      //   } catch (err) {
      //     console.error(err);
      //     alert("We can't submit the form, try again later?");
      //   }
    } else {
      setErrors(validationMessages);
    }
  };

  return (
    <Layout>
      <div>{path}</div>
      <div>{question.title}</div>
      <div>
        <form onSubmit={handleSubmit}>
          <ul>
            {question.questions.map((val, index) => {
              return (
                <li key={index}>
                  <input
                    value={val.value}
                    type="radio"
                    name={val.title}
                    placeholder={val.name}
                    required
                  />
                  <label>{val.name}</label>
                </li>
              );
            })}
          </ul>
          <input type="submit" />
        </form>
      </div>
      {!nextQuestion ? (
        <></>
      ) : (
        <div>
          <Link href={`/quiz/${nextQuestion.slug}`}>{nextQuestion.name}</Link>
        </div>
      )}
      {previousQuestion.name === "home" ? (
        <div>
          <Link href={`${previousQuestion.slug}`}>home</Link>
        </div>
      ) : (
        <div>
          <Link href={`/quiz/${previousQuestion.slug}`}>back</Link>
        </div>
      )}
    </Layout>
  );
};

export default Page;
