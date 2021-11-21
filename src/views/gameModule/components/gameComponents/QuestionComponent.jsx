import React, { Fragment, useEffect, useState } from "react";
import { Form, Modal, Progress } from "antd";
import { useQuestionComponent } from "../../hooks/gameComponents/useQuestionComponent";
import { playerResponse } from "../../../../core/action/Actions";
import {
  CloseOutlined,
  PlayCircleOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

const QuestionComponent = ({ numberIntents, setNumberIntents }) => {
  const [seconds, setSeconds] = useState(-4);

  let navigate = useNavigate();

  const { confirm } = Modal;

  const {
    question,
    response,
    isVisible,
    clearInfo,
    setResponse,
    dispatch,
    setIsVisible,
  } = useQuestionComponent(
    numberIntents,
    setNumberIntents,
    seconds,
    setSeconds
  );

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVisible) {
        logicGame();
      }
    }, 250);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, numberIntents, isVisible]);

  const logicGame = () => {
    if (numberIntents < 11) {
      if (seconds < 100) {
        setSeconds((seconds) => seconds + 1);
      } else if (seconds === 100 && !response.correct && !response.incorrect) {
        if (numberIntents < 10) {
          setNumberIntents((numberIntents) => numberIntents + 1);
        } else {
          setIsVisible(true);
          showConfirm();
        }
        validateQuest(false);
      } else if (seconds === 100) {
        setSeconds(0);
        if (numberIntents < 10) {
          setNumberIntents((numberIntents) => numberIntents + 1);
          clearInfo();
        } else {
          setIsVisible(true);
          showConfirm();
        }
      } else {
        setSeconds((seconds) => seconds - 1);
      }
    }
  };

  const showConfirm = () => {
    confirm({
      className: "confirmation-class",
      title: <h1> The game is over !! </h1>,
      content: <h2>Do you want to play again?</h2>,
      icon: <SettingFilled spin />,
      okText: (
        <span>
          <PlayCircleOutlined /> Try again
        </span>
      ),
      cancelText: (
        <span>
          <CloseOutlined /> Exit
        </span>
      ),
      okButtonProps: {
        className: "confirmation-button question-correct",
      },
      cancelButtonProps: {
        className: "confirmation-button question-incorrect",
      },
      onOk() {
        setNumberIntents(1);
        setIsVisible(false);
        setSeconds(0);
        clearInfo();
      },
      onCancel() {
        navigate("/");
      },
    });
  };

  return (
    <Fragment>
      <h1 className={"question-title"}>COUNTRY QUIZ</h1>
      <Form className={"question-container"} shape={"round"}>
        <h1>{numberIntents} of 10</h1>
        <h2>
          ¿ Which is the capital of
          <br />
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
          trailColor={"#ae81ee"}
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
