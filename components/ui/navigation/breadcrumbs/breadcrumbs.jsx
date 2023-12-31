import Link from "next/link";
import styles from "./breadcrumbs.module.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import BreadcrumbItem from "../breadcrumbItem/breadcrumbItem";
const Breadcrumbs = ({ breadcrumbs, path }) => {
  const router = useRouter();
  const ref = useRef();
  const [urlQuery, setUrlQuery] = useState(router.query);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const query = router.query;
    delete query.question;
    setUrlQuery(query);
    const index = breadcrumbs.findIndex((index) => {
      return router.asPath.split("?")[0].includes(index.breadcrumb);
    });
    console.log(index);
    if (router.asPath.split("?")[0].includes("/confirm")) {
      setProgress(100);
    }
    if (!router.asPath.includes("?")) {
      setProgress(0);
    } else {
      setProgress((index + 1) * 12);
      ref.current.scrollLeft = index * 108;
    }
  }, [router.query, router.asPath]);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list} ref={ref}>
        {breadcrumbs.map((crumb, index) => {
          return (
            <BreadcrumbItem
              key={index}
              crumb={crumb}
              urlQuery={urlQuery}
              path={path}
            />
          );
        })}
        <li className={styles.listItem} key={"confirm"}>
          <Link
            href={{ pathname: "/confirm", query: urlQuery }}
            className={router.asPath.includes("confirm") ? styles.active : ""}
          >
            confirm
          </Link>
        </li>
      </ul>
      <progress
        className={styles.progress}
        value={progress}
        max={100}
      ></progress>
    </div>
  );
};

export default Breadcrumbs;
