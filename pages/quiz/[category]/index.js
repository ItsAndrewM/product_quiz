import CircularProgress from "@/components/blocks/circularProgress/circularProgress";
import Layout from "@/components/ui/layout/layout";
import { getCategoryPaths, getQuestionData } from "@/lib/questions";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getStaticPaths = async () => {
  const paths = await getCategoryPaths();
  return {
    paths: paths.map((path) => `/quiz/${path}`) ?? [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const data = await getQuestionData(params.category);
  return {
    props: {
      category: params.category || null,
      data: data || null,
    },
  };
};

const Page = ({ data, category }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/quiz/${category}/${data[0].breadcrumb}`);
  }, []);

  return (
    <Layout>
      <CircularProgress />
    </Layout>
  );
};

export default Page;
