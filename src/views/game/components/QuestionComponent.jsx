import React, { Fragment, useEffect, useState } from "react";
import { Form } from "antd";
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
      if (seconds < 60) {
        setSeconds((seconds) => seconds + 1);
      } else if (seconds === 60) {
        setSeconds(0);
        clearInfo();
      } else {
        setSeconds((seconds) => seconds - 1);
      }
    }, 1000);
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
      dispatch(playerResponse(5));
    } else {
      setResponse({ correct: true, incorrect: true });
      dispatch(playerResponse(0));
    }
    setSeconds(62);
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
        <h2
          className={
            response.incorrect
              ? "color-red"
              : response.correct
              ? "color-green"
              : "color-purple"
          }
        >
          {60 - seconds > 0
            ? "Segundos restantes:" + (60 - seconds)
            : response.incorrect
            ? "Incorrecto :C "
            : response.correct
            ? "Correcto :)"
            : "Responde para sumar puntos"}
        </h2>
        <h2>Cual es la capital de {question.name}</h2>
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