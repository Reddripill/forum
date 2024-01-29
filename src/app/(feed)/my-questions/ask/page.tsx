import ProtectedLayout from "@/components/layout/ProtectedLayout";
import React from "react";
import type { Metadata } from "next";
import QuestionForm from "@/components/screens/my-question/questionForm/QuestionForm";

export const metadata: Metadata = {
   title: "Ask Your Question",
};

const AskQuestionPage = () => {
   return (
      <>
         <ProtectedLayout>
            <QuestionForm />
         </ProtectedLayout>
      </>
   );
};

export default AskQuestionPage;
