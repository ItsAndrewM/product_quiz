import styles from "./answerInput.module.css";
import breadCrumbStyles from "@/components/ui/navigation/breadcrumbs/breadcrumbs.module.css";

const AnswerInput = ({ type, name, value, title, defaultChecked }) => {
  return (
    <li className={`${styles.listItem} ${breadCrumbStyles.listItem}`}>
      <label htmlFor={name} className={styles.label}>
        {name}
        <input
          type={type}
          name={title}
          value={value}
          className={styles.input}
          defaultChecked={defaultChecked}
          required={type === "checkbox" ? false : true}
          placeholder={name}
        />
      </label>
    </li>
  );
};

export default AnswerInput;
