import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ShopContextProvider from './context/ShopContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
);

