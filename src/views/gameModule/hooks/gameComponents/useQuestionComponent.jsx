import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useQuestionComponent = () => {
  const [question, setQuestion] = useState({ name: "", options: [] });
  const [response, setResponse] = useState({
    correct: false,
    incorrect: false,
  });
  const data = useSelector((state) => state.GameReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    newIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.countries]);

  const newIntent = () => {
    data.countries.sort(() => Math.random() - Math.random()).find(() => true);
    const random = parseInt((Math.random() * 3).toFixed(0));
    const optionsArray = [];
    let name = "";
    data.countries.map((element, index) => {
      if (index < 4) {
        if (index === random) {
          name = element.name;
          optionsArray.push({ ...element, isCorrect: true });
        } else {
          optionsArray.push({ ...element, isCorrect: false });
        }
      }
      return 0;
    });
    setQuestion({ ...question, options: optionsArray, name: name });
  };

  const clearInfo = () => {
    setQuestion({ name: "", options: [] });
    setResponse({ correct: false, incorrect: false });
    newIntent();
  };

  return {
    question,
    response,
    clearInfo,
    setResponse,
    dispatch,
  };
};
