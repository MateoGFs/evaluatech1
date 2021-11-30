import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Axios from 'axios';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; 

Axios.defaults.baseURL='http://localhost:4000'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



