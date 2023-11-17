import Link from "next/link";
import styles from "./breadcrumbs.module.css";
import { breadcrumbs } from "@/data/breadcrumbs/breadcrumbs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Breadcrumbs = () => {
  const router = useRouter();
  const [urlQuery, setUrlQuery] = useState(router.query);
  useEffect(() => {
    const query = router.query;
    delete query.question;
    setUrlQuery(query);
  }, [router.query]);
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {breadcrumbs.map((crumb, index) => {
          return (
            <li className={styles.listItem} key={crumb.slug}>
              <Link
                href={{ pathname: `/quiz/${crumb.slug}`, query: urlQuery }}
                className={
                  router.asPath.includes(`/quiz/${crumb.slug}`)
                    ? styles.active
                    : ""
                }
              >
                {crumb.name}
              </Link>
              <span className={`${styles.right} ${styles.chevron}`}></span>
            </li>
          );
        })}
        <li className={styles.listItem} key={"confirm"}>
          <Link
            href={{ pathname: "/confirm", query: urlQuery }}
            className={router.asPath.includes("confirm") ? styles.active : ""}
          >
            {"confirm"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
