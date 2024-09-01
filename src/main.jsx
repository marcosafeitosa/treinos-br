import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/TelaLogin/Login';
import PaginaTreinos from './components/PaginaTreinos/PaginaTreinos'; // Importe a nova página
import 'antd/dist/reset.css'; // Ant Design 5

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/pagina-treinos" element={<PaginaTreinos />} /> {/* Defina a nova página */}
    </Routes>
  </Router>
);
