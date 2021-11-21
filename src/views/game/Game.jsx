import { Fragment, useEffect } from "react";
import QuestionComponent from "./QuestionComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadAllCountriesByRegion } from "../../core/action/Actions";

const Game = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/lang/es")
      .then((response) => {
        const data = [];
        if (response.data) {
          response.data.forEach((element) => {
            data.push({
              name: element.name,
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
      <QuestionComponent />
    </Fragment>
  );
};

export default Game;
