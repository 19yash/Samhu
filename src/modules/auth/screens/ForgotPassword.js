import React from 'react';
import { useForm } from 'react-hook-form';
import { styles } from '../styles/ForgotPassword.style';
import { useNavigate } from 'react-router-dom';
import images from '../../../images';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    // try {
    //   login(data);
    //   navigate('/app/dashboard');
    // } catch (error) {
    //   console.error('Error logging in:', error);
    //   setError('identifier', {
    //     type: 'manual',
    //     message: 'Invalid credentials',
    //   });
    // } finally {
    // }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.imageContainer}>
          <img src={images.fullBrandLogo} alt={'logo'} width={'200px'} />
        </div>
        <div style={styles.title}>Forgot Password</div>
        <div style={styles.formGroup}>
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
          <label htmlFor="email" style={{ ...styles.label, fontSize: '12px' }}>
            Enter your user account's verified email address and we will send
            you a password reset link.
          </label>

          {errors.email && (
            <p style={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <button type="submit" style={styles.button}>
          Send Password Reset Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
