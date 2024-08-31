import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/TelaLogin/Login";
// index.js ou App.jsx
import 'antd/dist/reset.css'; // Ant Design 5


const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  </StrictMode>
);
