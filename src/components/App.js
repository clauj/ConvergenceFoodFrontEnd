import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';
import Header from './Header'
import Registro from './Registro'
import Home from './Home'

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[300],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="registrar" element={<Registro />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
