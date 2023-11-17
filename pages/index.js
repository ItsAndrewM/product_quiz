import Layout from "@/components/ui/layout/layout";
import Link from "next/link";
import questionStyles from "@/styles/question.module.css";
import confirmStyles from "@/styles/confirm.module.css";

//https://www.firstlite.com/pages/firstlite-kit-finder.html?lang=en_CA

export default function Home() {
  return (
    <Layout>
      <div className={questionStyles.wrapper}>
        <div className={questionStyles.titleWrapper}>
          <h1>Takacat Boat Model Finder</h1>
          <p>
            Takacat boats embody the spirit of adventure and deliver an
            unparalleled on-water experience. With their exceptional
            versatility, stability, comfort, durability, and user-friendly
            design, Takacat day boats are the perfect choice for water
            enthusiasts seeking excitement and unforgettable moments. Find
            what&apos;s right for you.
          </p>
        </div>
        <Link
          href={"/quiz/purpose"}
          className={`${confirmStyles.button} ${questionStyles.submit}`}
        >
          Start Quiz
        </Link>
      </div>
    </Layout>
  );
}
