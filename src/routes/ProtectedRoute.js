import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { login } = useContext(UserContext);
  if (!login) return <Redirect to='/login'></Redirect>
     return <Route {...props} />
};

export default ProtectedRoute;
