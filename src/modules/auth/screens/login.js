import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { styles } from '../styles/login.style';
import { useNavigate } from 'react-router-dom';
import images from '../../../images';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const onSubmit = async (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    try {
      login(data);
      navigate('/app/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('identifier', {
        type: 'manual',
        message: 'Invalid credentials',
      });
    } finally {
    }
  };
  if (user) {
    console.log('🚀 ~ LoginForm ~ user:', user);
    navigate('/app/dashboard');
    return;
  }
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.imageContainer}>
          <img src={images.fullBrandLogo} alt={'logo'} width={'200px'} />
        </div>
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
