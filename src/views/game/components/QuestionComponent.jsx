import React, { Fragment, useEffect, useState } from "react";
import { Form, Progress } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { playerResponse } from "../../../core/action/Actions";

const QuestionComponent = () => {
  const [question, setQuestion] = useState({ name: "", options: [] });
  const [response, setResponse] = useState({
    correct: false,
    incorrect: false,
  });
  const [seconds, setSeconds] = useState(0);

  const data = useSelector((state) => state.GameReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.countries]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds < 100) {
        setSeconds((seconds) => seconds + 1);
      } else if (seconds === 100 && !response.correct && !response.incorrect) {
        validateQuest(false);
      } else if (seconds === 100) {
        setSeconds(0);
        clearInfo();
      } else {
        setSeconds((seconds) => seconds - 1);
      }
    }, 250);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  const startGame = () => {
    newIntent();
  };

  const validateQuest = (isCorrect) => {
    if (isCorrect) {
      setResponse({ correct: true, incorrect: false });
      dispatch(playerResponse(2 * (100 - seconds)));
    } else {
      setResponse({ correct: true, incorrect: true });
      dispatch(playerResponse(0));
    }
    setSeconds(108);
  };

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

  return (
    <Fragment>
      <h1 className={"question-title"}>COUNTRY QUIZ</h1>
      <Form className={"question-container"} shape={"round"}>
        <h2>
          ¿ Which is the capital of <br />
          {question.name} ?
        </h2>
        <Progress
          percent={
            response.incorrect ? 0 : response.correct ? 100 : 100 - seconds
          }
          success={false}
          status={
            response.incorrect
              ? "exception"
              : response.correct
              ? "success"
              : "active"
          }
          type="line"
          showInfo={false}
          strokeColor={{
            from: "black",
            to: "#8026ff",
          }}
          strokeWidth={15}
        />
        <br />
        <br />
        {question.options.map((element, index) => {
          return (
            <div key={index}>
              <button
                disabled={response.correct || response.incorrect}
                onClick={() => {
                  validateQuest(element.isCorrect);
                  element.clicked = !element.clicked;
                }}
                className={
                  response.correct && element.isCorrect
                    ? "question-button question-correct"
                    : response.incorrect &&
                      !element.isCorrect &&
                      element.clicked
                    ? "question-button question-incorrect"
                    : response.correct || response.incorrect
                    ? "question-button disabled"
                    : "question-button"
                }
              >
                {element.capital}
              </button>
              <br />
            </div>
          );
        })}
      </Form>
    </Fragment>
  );
};

export default QuestionComponent;
