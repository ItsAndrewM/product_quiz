import RadioCheckInput from "../radioCheckInput/radioCheckInput";
import TextInput from "../textInput/textInput";
import styles from "./answerInput.module.css";
import breadCrumbStyles from "@/components/ui/navigation/breadcrumbs/breadcrumbs.module.css";

const AnswerInput = ({ type, name, value, title, defaultChecked }) => {
  return (
    <li className={`${styles.listItem} ${breadCrumbStyles.listItem}`}>
      {type !== "radio" && type !== "checkbox" ? (
        <TextInput type={type} name={name} title={title} />
      ) : (
        <RadioCheckInput
          type={type}
          name={name}
          value={value}
          title={title}
          defaultChecked={defaultChecked}
        />
      )}
    </li>
  );
};

export default AnswerInput;
