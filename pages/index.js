import Layout from "@/components/ui/layout/layout";
import Link from "next/link";

//https://www.firstlite.com/pages/firstlite-kit-finder.html?lang=en_CA

export default function Home() {
  return (
    <Layout>
      <div>
        <Link href={"/quiz/purpose"}>Start Quiz</Link>
      </div>
    </Layout>
  );
}
