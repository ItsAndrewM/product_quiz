import styles from "./circularProgress.module.css";

const CircularProgress = () => {
  return (
    <div className={styles.wrapper}>
      <progress className={styles.pureMaterialProgressCircular} />
    </div>
  );
};

export default CircularProgress;
