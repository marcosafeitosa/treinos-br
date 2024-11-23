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
import NotFound from "./components/NotFound/NotFound.jsx";
import ProgramacaoInstrucaoSoldado from './components/ContainerTreinos/ProgramaInstrucaoSoldado';
import ProgramacaoInstrucaoPracas from "./components/ContainerTreinos/ProgramaInstrucaoPracas.jsx";
import ModuloExtraMilitar from './components/ContainerTreinos/ModuloExtraMilitar';
import SegurancaVirtual from './components/ContainerTreinos/SegurancaVirtual';
import ModComportamentoPostura from './components/ContainerTreinos/ModComportamentoPostura';
import EditalMilitarI from './components/ContainerTreinos/EditalMilitarI';
import EditalMilitarII from './components/ContainerTreinos/EditalMilitarII';
import ModuloFidelizacaoPracas from "./components/ContainerTreinos/ModuloFidelizacaoPracas.jsx";

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
      <Route path="/programa-instrucao-soldado" element={<ProgramacaoInstrucaoSoldado />} />
      <Route path="/modulo-ortografico" element={<ModuloOrtografico />} />
      <Route path="/programa-instrucao-pracas" element={<ProgramacaoInstrucaoPracas />} />
      <Route path="/modulo-extra-militar" element={<ModuloExtraMilitar />} />
      <Route path="/seguranca-virtual" element={<SegurancaVirtual />} />
      <Route path="/modulo-comportamento-postura" element={<ModComportamentoPostura />} />
      <Route path="/edital-militar-i" element={<EditalMilitarI />} />
      <Route path="/edital-militar-ii" element={<EditalMilitarII />} />
      <Route path="/modulo-fidelizacao-pracas" element={<ModuloFidelizacaoPracas />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);
