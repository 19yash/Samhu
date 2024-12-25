import { useContext } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import UserService from '../../../services/AuthService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { state, setAuth, clearAuth, sessionTimeOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const showError = (error) => {
    toast.error(error.message);
  };

  const login = async (credentials) => {
    try {
      const response = await UserService.login(credentials);
      console.log('🚀 ~ login ~ response:', response);
      if (response?.data) {
        setAuth({ user: response.data });
        return { message: 'success' };
      } else {
        return { message: 'error' };
      }
    } catch (error) {
      showError(error);
      return { message: 'error' };
    }
  };

  const register = async (credentials) => {
    try {
      const user = await UserService.register(credentials);
      return user;
    } catch (error) {
      showError(error);
    }
  };

  const logout = async () => {
    try {
      // await UserService.logout();
      clearAuth();
      navigate('/login');
    } catch (error) {
      showError(error);
    }
  };

  const onSessionTimeOut = async () => {
    try {
      await UserService.logout();
      sessionTimeOut();
    } catch (error) {
      showError(error);
    }
  };

  return {
    ...state,
    login,
    logout,
    register,
    onSessionTimeOut,
  };
};
