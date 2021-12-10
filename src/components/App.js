import React, {useContext} from "react";
import { red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
import GlobalRoutes from "../routes";
import { UserStorage } from "../context/UserContext";
import "../components/App.css"
import { CartProvider } from "../context/CartContext";


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



const App = () => {

  return (
  
    <UserStorage>
    <CartProvider>
      <GlobalRoutes />
    </CartProvider>
    </UserStorage>
  )};

export default App;
