import React, { useEffect, useState } from 'react';
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
  console.log('🚀 ~ ResetPassword ~ state:', state);
  const token = state?.token || {};
  console.log('🚀 ~ ResetPassword ~ token:', token);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    if (data.new_password !== data.confirm_password) {
      toast.error("Password doesn't match");
      return;
    }
    try {
      setLoading(true);
      const response = await httpService.post(routeLink.resetPassword, {
        new_password: data.new_password,
        token: token,
      });
      console.log('🚀 ~ onSubmit ~ response:', response);
      if (response.message === 'success') {
        toast.success('Password Changed Successfully');
        navigate('/login');
      }
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
  // useEffect(() => {
  //   if (!token) {
  //     toast.error('Something Went Wrong Please Try Again Later');
  //     navigate('/forgot-password');
  //   }
  // });
  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <div style={styles.imageContainer}>
          <img src={images.fullBrandLogo} alt={'logo'} width={'200px'} />
        </div>
        <div style={styles.formGroup}>
          <div style={styles.label}>New Password</div>
          <input
            type="password"
            id="new_password"
            {...register('new_password', {
              required: 'Password is required',
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
          {errors.new_password && (
            <p style={styles.errorMessage}>{errors.new_password.message}</p>
          )}
        </div>
        <div style={styles.formGroup}>
          <div style={styles.label}>Confirm Password</div>
          <input
            type="password"
            id="confirm_password"
            {...register('confirm_password', {
              required: 'Password is required',
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])[A-Za-z\d\S]+$/,
                message:
                  'Password must contain at least one letter, one uppercase letter, and one special character',
              },
            })}
            style={styles.input}
            placeholder="Confirm Password"
          />
          {errors.confirm_password && (
            <p style={styles.errorMessage}>{errors.confirm_password.message}</p>
          )}
        </div>
        <Button
          text="Reset Password"
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default ResetPassword;
