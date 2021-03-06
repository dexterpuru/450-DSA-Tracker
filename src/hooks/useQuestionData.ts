import { useEffect, useState } from "react";
import { QuestionData } from "../Backend/db-store/data";
import { IQuestionData } from "../Backend/model/Question-model";
import { getData, updateDocumentState } from "../Backend/services/database";

type TQuestionData = [
  IQuestionData[],
  React.Dispatch<React.SetStateAction<IQuestionData[]>>,
  Function
];

export function useQuestionData(): TQuestionData {
  const [questionData, setQuestionData] = useState<IQuestionData[]>([]);

  function updateData(key: any, topicData: any, topicPosition: any) {
    let reGeneratedQData: IQuestionData[] = questionData.map(
      (topic: IQuestionData, index: number) => {
        if (index === topicPosition) {
          updateDocumentState(key, topicData);
          return topicData;
        } else {
          return topic;
        }
      }
    );

    setQuestionData(reGeneratedQData);
  }

  useEffect(() => {
    console.log("loaded from contextAPI");

    getData((qData: IQuestionData[]) => setQuestionData(qData));
  }, []);

  return [questionData, setQuestionData, updateData];
}
