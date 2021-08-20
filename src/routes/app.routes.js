import React from 'react'
import { Route , Routes } from 'react-router-dom';
import Registro from '../components/Registro'
import Painel from '../components/Painel'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/painel" element={<Painel />} />
    </Routes>
  )
}

export default AppRoutes;
