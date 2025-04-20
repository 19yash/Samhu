import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styles } from '../styles/ForgotPassword.style';
import { useNavigate, useParams } from 'react-router-dom';
import images from '../../../images';
import httpService from '../../../services/httpService';
import routeLink from '../../../constants/routeLink';
import Button from '../../components/button/Button';
import { toast } from 'react-toastify';

const ConfirmOtp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { email } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await httpService.post(routeLink.confirmOtp, {
        otp: data.otp,
        email: email,
      });
      if (response && response?.message !== 'error') {
        toast.success(
          'OTP Confirmed Successfully Please check your email for password reset link'
        );
        navigate('/login');
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error logging in:', error);
      setError('identifier', {
        type: 'manual',
        message: 'Invalid OTP',
      });
      setLoading('false');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form}>
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
          {errors.otp && (
            <p style={styles.errorMessage}>{errors.otp.message}</p>
          )}
        </div>
        <Button
          text="Confirm OTP"
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default ConfirmOtp;
