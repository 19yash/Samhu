import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppNavigator } from './routes/AppNavigator';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <AppNavigator />
      <ToastContainer
        position="top-right"
        // autoClose={5000} // Auto close after 5 seconds
        // hideProgressBar={false}
        // newestOnTop={false}
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        // theme="light" // Use 'dark' for dark mode
      />
    </BrowserRouter>
  );
}

export default App;
