import { Fragment, useEffect } from "react";
import QuestionComponent from "./components/QuestionComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadAllCountriesByRegion } from "../../core/action/Actions";
import { Col, Row } from "antd";
import ProfileComponent from "./components/ProfileComponent";

const Game = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const data = [];
        if (response.data) {
          response.data.forEach((element) => {
            data.push({
              name: element.name.common,
              capital: element.capital,
              clicked: false,
            });
          });
        }
        dispatch(loadAllCountriesByRegion(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);
  return (
    <Fragment>
      <Row>
        <Col span={8}>
          <ProfileComponent />
        </Col>
        <Col span={8}>
          <QuestionComponent />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Game;
