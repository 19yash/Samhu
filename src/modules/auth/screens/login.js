import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { styles } from '../styles/login.style';
import FullLogo from '../../../assets/brand/FullLogo.PNG';
import { useNavigate } from 'react-router-dom';
import httpService from '../../../services/httpService';
import { ApiPaths } from '../../../constants/apiPaths';
import { AuthContext } from '../../../context/auth/AuthContext';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { setLoading, setAuth, state } = useContext(AuthContext);
  const { user, loading } = state;
  const onSubmit = async (data) => {
    console.log('Email:', data.email, 'Password:', data.password);
    setLoading(true);
    try {
      const response = await httpService.post(ApiPaths.login, data);
      if (response.user) {
        setAuth(response.user);
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('identifier', {
        type: 'manual',
        message: 'Invalid credentials',
      });
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  // if (loading)
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.imageContainer}>
          <img src={FullLogo} alt={'logo'} width={'200px'} height={'80px'} />
        </div>
        <h2 style={styles.title}>Login</h2>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email format',
              },
            })}
            style={styles.input}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p style={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])[A-Za-z\d\S]+$/,
                message:
                  'Password must contain at least one letter, one uppercase letter, and one special character',
              },
            })}
            style={styles.input}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p style={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>
        <div style={styles.formGroup}>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </div>

        <button
          type=""
          style={styles.button}
          onClick={() => {
            navigate('/singup');
          }}
        >
          Create New Account
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
