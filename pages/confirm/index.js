import Layout from "@/components/ui/layout/layout";
import { questions } from "@/data/questions/questions";
import { breadcrumbs } from "@/data/breadcrumbs/breadcrumbs";
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
      <div>confirm</div>
      <div>
        <ul>
          {Object.keys(data).map((val, index) => {
            return (
              <li>
                {breadcrumbs.at(index).name}: {data[val]}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Page;
