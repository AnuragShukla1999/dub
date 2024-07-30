import React from 'react';
import { createRoot } from 'react-dom/client';

import { AuthContextProvider, ConfigProvider } from './contexts/ConfigContext';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ConfigProvider>
    <AuthContextProvider>
      <PrimeReactProvider>
        <Toaster />
        <App />
      </PrimeReactProvider>
    </AuthContextProvider>
  </ConfigProvider>
);

reportWebVitals();
