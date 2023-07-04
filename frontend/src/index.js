import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContactContextProvider } from './contexts/contactContext';
import { AuthContextProvider } from './contexts/authContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <ContactContextProvider>
            <App />
        </ContactContextProvider>
    </AuthContextProvider>
);


