import React, { useState } from 'react';
import { styles } from '../styles/ForgotPassword.style';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import httpService from '../../../services/httpService';
import Button from '../../components/button/Button';
import routeLink from '../../../constants/routeLink';
import images from '../../../images';

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { state } = useLocation();
  const token = state?.token;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  if (!token) {
    toast.error('Something Went Wrong Please Try Again Later');
    navigate('/forgot-password');
  }
  const onSubmit = async (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    try {
      setLoading(true);
      const response = await httpService.post(routeLink.resetPassword, {
        new_password: data.new_password,
        token: token,
      });
      console.log('🚀 ~ onSubmit ~ response:', response);
      setLoading('false');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('identifier', {
        type: 'manual',
        message: 'Invalid credentials',
      });
      setLoading('false');
    } finally {
    }
  };

  <div style={styles.container}>
    <form style={styles.form}>
      <div style={styles.imageContainer}>
        <img src={images.fullBrandLogo} alt={'logo'} width={'200px'} />
      </div>
      <div style={styles.title}>Enter New Password</div>
      <div style={styles.formGroup}>
        <input
          type="number"
          id="otp"
          {...register('otp', {
            required: 'password is required',
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])[A-Za-z\d\S]+$/,
              message:
                'Password must contain at least one letter, one uppercase letter, and one special character',
            },
          })}
          style={styles.input}
          placeholder="New Password"
        />
        {errors.password && (
          <p style={styles.errorMessage}>{errors.password.message}</p>
        )}
      </div>
      <Button
        text="Confirm OTP"
        loading={loading}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  </div>;
};

export default ResetPassword;
