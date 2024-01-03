import React from "react";
import type { Metadata } from "next";
import QuestionsPageContent from "@/components/screens/postsFeed/questionsPage/QuestionsPageContent";

export const metadata: Metadata = {
   title: "Questions",
};

const QuestionsPage = () => {
   return <QuestionsPageContent />;
};

export default QuestionsPage;
