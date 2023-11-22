import Layout from "@/components/ui/layout/layout";
import Link from "next/link";
import questionStyles from "@/styles/question.module.css";
import confirmStyles from "@/styles/confirm.module.css";
import Image from "next/image";
import quizStyles from "@/styles/quiz.module.css";
import { getCategoryPaths } from "@/lib/questions";
import { getCollection } from "@/lib/swell/helpers";
//https://www.firstlite.com/pages/firstlite-kit-finder.html?lang=en_CA

export const getServerSideProps = async (context) => {
  const paths = await getCategoryPaths();

  return {
    props: {
      paths: paths || null,
    },
  };
};

export default function Home({ paths }) {
  return (
    <Layout>
      <div className={questionStyles.wrapper}>
        <div className={questionStyles.titleWrapper}>
          <h1>BOAT ACCESSORIES FINDER</h1>
          <p>
            Whether you need to anchor your boat, transport it on land, adjust
            your sails, or control your furling system, we have the right
            products for you. Find the best fit for your boat and your budget
            with our product quiz.
          </p>
        </div>
        <ul className={questionStyles.list}>
          {paths.map((path) => {
            return (
              <li key={path} className={`${quizStyles.listItem} `}>
                <Link href={`/quiz/${path}`} className={quizStyles.link}>
                  <Image
                    src={`/images/${path}.jpg`}
                    width={200}
                    height={200}
                    alt={path}
                    style={{ objectFit: "cover" }}
                  />
                </Link>
                <Link href={`/quiz/${path}`} className={quizStyles.submit}>
                  {path}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}
