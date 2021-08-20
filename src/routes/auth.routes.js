import React from 'react'
import { Route , Routes } from 'react-router-dom';
import Registro from '../components/Registro'
import Home from '../components/Home'

const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="registrar" element={<Registro />} />
    </Routes>
  )
}

export default AuthRoutes;
