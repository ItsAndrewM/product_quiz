import Link from "next/link";
import styles from "../breadcrumbs/breadcrumbs.module.css";
import { useRouter } from "next/router";

const BreadcrumbItem = ({ crumb, urlQuery, path }) => {
  const router = useRouter();

  return (
    <li className={styles.listItem} key={crumb.breadcrumb}>
      <Link
        href={{
          pathname: `/quiz/${path}/${crumb.breadcrumb}`,
          query: urlQuery,
        }}
        className={
          router.asPath.includes(`/${crumb.breadcrumb}`) ? styles.active : ""
        }
      >
        {crumb.breadcrumb}
      </Link>
      <span className={`${styles.right} ${styles.chevron}`}></span>
    </li>
  );
};

export default BreadcrumbItem;
