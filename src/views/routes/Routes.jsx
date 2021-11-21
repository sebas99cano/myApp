import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ element: Element, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Element {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
export const PublicRoute = ({ element: Element, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? <Element {...props} /> : <Redirect to="/" />
      }
    />
  );
};
