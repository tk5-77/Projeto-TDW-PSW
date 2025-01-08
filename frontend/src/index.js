import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importando os estilos globais (opcional, mas recomendado)
import App from './App'; // Importando o componente principal (App.js)
import { BrowserRouter as Router } from 'react-router-dom'; // Importando o Router

// Renderiza o componente App dentro da div com id 'root' no HTML
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);