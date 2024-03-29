import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from "./Redux/Store"
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <MantineProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </MantineProvider>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
