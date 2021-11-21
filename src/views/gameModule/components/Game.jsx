import { Fragment } from "react";
import QuestionComponent from "./gameComponents/QuestionComponent";
import { Col, Row } from "antd";
import ProfileComponent from "./gameComponents/ProfileComponent";
import { useGame } from "../hooks/useGame";

const Game = () => {
  const { numberIntents, setNumberIntents } = useGame();

  return (
    <Fragment>
      <Row>
        <Col span={8}>
          <ProfileComponent />
        </Col>
        <Col span={8}>
          <QuestionComponent
            numberIntents={numberIntents}
            setNumberIntents={setNumberIntents}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Game;
