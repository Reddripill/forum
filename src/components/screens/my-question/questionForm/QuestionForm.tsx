import React from "react";
import styles from "./QuestionForm.module.scss";
import Input from "@/components/UI/input/Input";

const QuestionForm = () => {
   return (
      <div className={styles.wrapper}>
         <Input className={styles.input} placeholder="Choose categories" />
         <Input className={styles.input} placeholder="Type catching attention title" />
      </div>
   );
};

export default QuestionForm;
