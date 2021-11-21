import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadAllCountriesByRegion } from "../../../core/action/Actions";

export const useGame = () => {
  const [numberIntents, setNumberIntents] = useState(1);
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

  return {
    numberIntents,
    setNumberIntents,
  };
};
