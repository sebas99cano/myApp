import React from "react";
import Game from "../gameModule/components/Game";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../layout/Home";
import NotFoundPage from "../layout/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/game"} element={<Game />} />
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
