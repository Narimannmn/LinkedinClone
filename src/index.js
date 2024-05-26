import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import WalletProvider from "./provider/WalletProvider";
import { Buffer } from 'buffer';
window.Buffer = Buffer;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <WalletProvider>

        <App />
      </WalletProvider>
    </BrowserRouter>
);
