import confirmStyles from "@/styles/confirm.module.css";

const ConfirmedInput = ({ question, data }) => {
  return (
    <li className={confirmStyles.results}>
      <p>{question.breadcrumb}:</p>
      <p>
        {data[question.key] ? (
          typeof data[question.key] !== "string" ? (
            data[question.key].map((val, index) =>
              index + 1 < data[question.key].length ? `${val}, ` : val
            )
          ) : (
            data[question.key]
          )
        ) : (
          <span>
            {question.questions.map((name, index) => {
              return (
                <span key={name.name}>
                  {data[name.name]}
                  {index + 1 < question.questions.length ? ", " : ""}
                </span>
              );
            })}
          </span>
        )}
      </p>
    </li>
  );
};

export default ConfirmedInput;
