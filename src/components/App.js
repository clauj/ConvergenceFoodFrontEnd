import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
import GlobalRoutes from "../routes";
import {UserStorage} from "../context/UserContext";

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
  <ThemeProvider theme={theme}>
    <UserStorage>
      <GlobalRoutes />
    </UserStorage>
  </ThemeProvider>
);

export default App;
