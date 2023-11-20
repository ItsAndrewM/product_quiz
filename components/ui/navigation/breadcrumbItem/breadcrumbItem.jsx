import Link from "next/link";
import styles from "../breadcrumbs/breadcrumbs.module.css";
import { useRouter } from "next/router";

const BreadcrumbItem = ({ crumb, urlQuery }) => {
  const router = useRouter();

  return (
    <li className={styles.listItem} key={crumb.slug}>
      <Link
        href={{ pathname: `/quiz/${crumb.slug}`, query: urlQuery }}
        className={
          router.asPath.includes(`/quiz/${crumb.slug}`) ? styles.active : ""
        }
      >
        {crumb.name}
      </Link>
      <span className={`${styles.right} ${styles.chevron}`}></span>
    </li>
  );
};

export default BreadcrumbItem;
