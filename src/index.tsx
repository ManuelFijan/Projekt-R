// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Importujte BrowserRouter
import App from './App';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter> {/* Omotajte App u BrowserRouter */}
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
