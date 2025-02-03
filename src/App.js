import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppNavigator } from './routes/AppNavigator';
import './App.css';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <BrowserRouter>
        <AppNavigator />
        <ToastContainer position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
