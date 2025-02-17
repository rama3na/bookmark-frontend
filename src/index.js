import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import UserLoginStore from './contexts/UserLoginStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserLoginStore>
    <App />
  </UserLoginStore>
);

reportWebVitals();
