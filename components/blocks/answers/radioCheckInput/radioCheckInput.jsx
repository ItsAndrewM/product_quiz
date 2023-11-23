import styles from "../answerInput/answerInput.module.css";

const RadioCheckInput = ({ type, name, value, title, defaultChecked }) => {
  return (
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
  );
};

export default RadioCheckInput;
