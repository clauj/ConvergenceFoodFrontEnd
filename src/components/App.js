import React from "react";
import { red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
import GlobalRoutes from "../routes";
import {UserStorage} from "../context/UserContext";
import "../components/App.css"

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[300],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});

const App = () => (
    <UserStorage>
      <GlobalRoutes />
    </UserStorage>
);

export default App;
