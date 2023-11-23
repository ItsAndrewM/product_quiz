import styles from "../answerInput/answerInput.module.css";

const TextInput = ({ type, name, title }) => {
  return (
    <div className={styles.inputWrapper}>
      {" "}
      <input
        id={`${title}.${name}`}
        type={type}
        name={name}
        placeholder={name}
        required
        className={styles.fillInput}
        min={0}
      />
      <label
        htmlFor={`${title}.${name}`}
        className={`${styles.fillInputLabel} `}
      >
        {name}
      </label>
    </div>
  );
};

export default TextInput;
