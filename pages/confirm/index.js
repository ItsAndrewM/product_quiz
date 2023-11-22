import Layout from "@/components/ui/layout/layout";
import questionStyles from "@/styles/question.module.css";
import Link from "next/link";
import styles from "@/styles/confirm.module.css";
import quizStyles from "@/styles/quiz.module.css";
import { getQuestionData } from "@/lib/questions";
import ConfirmedInput from "@/components/blocks/confirm/confirmedInput/confirmedInput";
import { findBestMatches, getCollection } from "@/lib/swell/helpers";
import CircularProgress from "@/components/blocks/circularProgress/circularProgress";
import Image from "next/image";
export const getServerSideProps = async (context) => {
  const questions = await getQuestionData(context.query.category);
  const collection = await getCollection({ handle: context.query.category });
  // console.log(collection.products);
  // Call the function to find the best matches for the customer’s answers
  const bestMatches = findBestMatches(collection.products, context.query);

  // Print the best matches to the console

  return {
    props: {
      data: context.query || null,
      questions: questions || null,
      collection: collection || null,
      bestMatches: bestMatches || null,
    },
  };
};

const Page = ({ data, questions, collection, bestMatches }) => {
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
            <ul className={questionStyles.list}>
              {bestMatches.map((product) => {
                console.log(product);
                return (
                  <li key={product.id} className={`${quizStyles.listItem} `}>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`}
                      className={quizStyles.link}
                    >
                      <Image
                        src={
                          !product.images
                            ? `https://placehold.co/${200}x${200}/jpeg`
                            : product.images[0].file.url
                        }
                        width={200}
                        height={200}
                        alt={product.name}
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`}
                      className={quizStyles.submit}
                    >
                      {product.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <ul className={questionStyles.list}>
            {bestMatches.map((product) => {
              console.log(product);
              return (
                <li key={product.id} className={`${quizStyles.listItem} `}>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`}
                    className={quizStyles.link}
                  >
                    <Image
                      src={
                        !product.images.length
                          ? `https://placehold.co/${200}x${200}/jpeg`
                          : product.images[0].file.url
                      }
                      width={200}
                      height={200}
                      alt={product.name}
                      style={{ objectFit: "cover" }}
                    />
                  </Link>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.slug}`}
                    className={`${styles.button} ${quizStyles.submit}`}
                  >
                    {product.name}
                  </Link>
                </li>
              );
            })}
          </ul>
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
