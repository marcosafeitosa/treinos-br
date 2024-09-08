import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/TelaLogin/Login";
import PaginaTreinos from "./components/PaginaTreinos/PaginaTreinos"; // Importe a nova página
import "antd/dist/reset.css"; // Ant Design 5
import TreinoBasicoI from "./components/ContainerTreinos/TreinoBasicoI";
import TreinoBasicoII from "./components/ContainerTreinos/TreinoBasicoII.jsx";
import TreinoCompI from "./components/ContainerTreinos/TreinoCompI.jsx";
import TreinoCompII from "./components/ContainerTreinos/TreinoCompII.jsx";
import ModuloOrtografico from "./components/ContainerTreinos/ModuloOrtografico.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/pagina-treinos" element={<PaginaTreinos />} />
      <Route path="/treino-basico-i" element={<TreinoBasicoI />} />
      <Route path="/treino-basico-ii" element={<TreinoBasicoII />} />
      <Route path="/treino-comp-i" element={<TreinoCompI />} />
      <Route path="/treino-comp-ii" element={<TreinoCompII />} />
      <Route path="/modulo-ortografico" element={<ModuloOrtografico />} />
    </Routes>
  </Router>
);
