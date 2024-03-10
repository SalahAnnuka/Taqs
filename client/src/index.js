import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import bg from './components/drawable/taqs-icon-black.svg';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <div className='bg-texture' style={{ backgroundImage: `url(${bg})` }}></div>
    <App />
  </React.StrictMode>
);

