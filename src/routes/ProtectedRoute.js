import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { login } = useContext(UserContext);

  console.log("Login: " + login);

  if (login) {
    return <Route {...props} />;
  } else if (login === false) {
    return <Redirect to="/login" />;
  }
};

export default ProtectedRoute;
