import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainLayout from './project.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './ThemeContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  </React.StrictMode>
);
