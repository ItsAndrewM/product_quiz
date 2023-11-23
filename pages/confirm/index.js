import Layout from "@/components/ui/layout/layout";
import questionStyles from "@/styles/question.module.css";
import Link from "next/link";
import styles from "@/styles/confirm.module.css";
import quizStyles from "@/styles/quiz.module.css";
import { getQuestionData } from "@/lib/questions";
import ConfirmedInput from "@/components/blocks/confirm/confirmedInput/confirmedInput";
import {
  findBestMatches,
  getCategoryAccessories,
  getCollection,
} from "@/lib/swell/helpers";
import CircularProgress from "@/components/blocks/circularProgress/circularProgress";
import Image from "next/image";
import ProductGrid from "@/components/blocks/productGrid/productGrid";
export const getServerSideProps = async (context) => {
  const questions = await getQuestionData(context.query.category);
  const collection = await getCollection({ handle: context.query.category });
  // console.log(collection.products);
  // Call the function to find the best matches for the customer’s answers
  const bestMatches = findBestMatches(collection.products, context.query);
  const accessories = await getCategoryAccessories({
    handle: context.query.category,
  });

  console.log(accessories.products.length);

  // Print the best matches to the console

  return {
    props: {
      data: context.query || null,
      questions: questions || null,
      collection: collection || null,
      bestMatches: bestMatches || null,
      accessories: accessories.products || null,
    },
  };
};

const Page = ({ data, questions, collection, bestMatches, accessories }) => {
  if (!data && !questions && !collection && !bestMatches) {
    return (
      <Layout>
        <CircularProgress />
      </Layout>
    );
  }
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
          <>
            <div
              className={questionStyles.box}
              style={{ flexDirection: "column" }}
            >
              <p>
                Someone from our sales team will reach out shortly to provide
                you with a quote for a new sail.
              </p>
              <p>
                Below are standard sails which may fit what you&apos;re looking
                for
              </p>
            </div>
            <ProductGrid products={bestMatches} />
          </>
        ) : (
          <>
            <ProductGrid products={bestMatches} />
          </>
        )}
        {!accessories.length ? (
          <></>
        ) : (
          <>
            {" "}
            <h1>
              Check out these accessories for any of your {data.category} needs
            </h1>
            <ProductGrid products={accessories} />
          </>
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
