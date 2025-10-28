import React from 'react';
import ReactDOM from 'react-dom/client';
// DÒNG NÀY QUAN TRỌNG NHẤT
import './index.css'; 
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
