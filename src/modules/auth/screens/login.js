import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styles } from '../styles/login.style';
import { useNavigate } from 'react-router-dom';
import images from '../../../images';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import Button from '../../components/button/Button';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await login(data);
      if (response.message === 'success') {
        navigate('/app/dashboard');
        toast.success('Login Successfully');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error logging in:', error);
      setError('identifier', {
        type: 'manual',
        message: 'Invalid credentials',
      });
      setLoading(false);
    }
  };
  // if (user) {
  //   navigate('/app/events');
  // }
  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <div style={styles.imageContainer}>
          <img src={images.fullBrandLogo} alt={'logo'} width={'300px'} />
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
        <div
          style={{
            ...styles.formGroup,
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <a href="/forgot-password" style={styles.linkStyle}>
            Forgot Password
          </a>
          <a href="/home" style={styles.linkStyle}>
            Home Page
          </a>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
          }}
        >
          <Button
            text="Login"
            onClick={handleSubmit(onSubmit)}
            loading={loading}
          />
          <Button
            text="Create New Account"
            onClick={() => {
              navigate('/singup');
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
