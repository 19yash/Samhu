import React from 'react';
import { useForm } from 'react-hook-form';
import { styles } from '../styles/ForgotPassword.style';
import { useNavigate } from 'react-router-dom';
import images from '../../../images';

const ConfirmOtp = () => {
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
        <div style={styles.title}>Enter OTP send to your email address</div>
        <div style={styles.formGroup}>
          <input
            type="number"
            id="otp"
            {...register('otp', {
              required: 'OTP is required',
              pattern: {
                value: /^\d{6}$/,
                message: 'Invalid OTP',
              },
            })}
            style={styles.input}
            placeholder="OTP"
          />
          {errors.email && (
            <p style={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>
        <button type="submit" style={styles.button}>
          Confirm OTP
        </button>
      </form>
    </div>
  );
};

export default ConfirmOtp;
