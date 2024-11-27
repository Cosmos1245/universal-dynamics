import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainLayout from './project.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './ThemeContext.js';
import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
        <Router>
            <MainLayout />
        </Router>
    </ThemeProvider>
  </React.StrictMode>
);
