import logo from './logo.svg';
import './App.css';
import SignUpForm from './modules/auth/screens/singup';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppNavigator } from './routes/AppNavigator';
import LoginForm from './modules/auth/screens/login';

function App() {
  return (
    <BrowserRouter>
      <AppNavigator />
    </BrowserRouter>
  );
}

export default App;
