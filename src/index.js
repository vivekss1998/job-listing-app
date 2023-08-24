import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router
import App from './App'; // Assuming your main App component is located in 'App.js'
import './index.css';

ReactDOM.render(
  <Router> {/* Wrap your App component with the Router */}
    <App />
  </Router>,
  document.getElementById('root')
);
