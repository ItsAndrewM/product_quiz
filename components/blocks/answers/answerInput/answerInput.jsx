import styles from "./answerInput.module.css";
import breadCrumbStyles from "@/components/ui/navigation/breadcrumbs/breadcrumbs.module.css";

const AnswerInput = ({ type, name, value, title, defaultChecked }) => {
  return (
    <li className={`${styles.listItem} ${breadCrumbStyles.listItem}`}>
      {type !== "radio" && type !== "checkbox" ? (
        <div className={styles.inputWrapper}>
          {" "}
          <input
            id={`${title}.${name}`}
            type={type}
            name={name}
            placeholder={name}
            required
            className={styles.fillInput}
          />
          <label
            htmlFor={`${title}.${name}`}
            className={`${styles.fillInputLabel} `}
          >
            {name}
          </label>
        </div>
      ) : (
        <label htmlFor={`${title}.${name}`} className={styles.label}>
          {name}
          <input
            id={`${title}.${name}`}
            type={type}
            name={title}
            value={value}
            className={styles.input}
            defaultChecked={defaultChecked}
            required={type === "checkbox" ? false : true}
            placeholder={name}
          />
        </label>
      )}
    </li>
  );
};

export default AnswerInput;
