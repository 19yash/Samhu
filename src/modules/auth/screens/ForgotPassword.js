import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styles } from '../styles/ForgotPassword.style';
import { useNavigate } from 'react-router-dom';
import images from '../../../images';
import httpService from '../../../services/httpService';
import routeLink from '../../../constants/routeLink';
import { toast } from 'react-toastify';
import Button from '../../components/button/Button';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await httpService.post(routeLink.forgotPassword, {
        email: data.email,
      });
      if (response.message === 'OTP sent to your email') {
        toast.success('Email Send Successfully');
        navigate(`/confirm-otp/${data?.email}`);
      } else {
        toast.error(response.message);
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

  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <div style={styles.imageContainer}>
          <img src={images.fullBrandLogo} alt={'logo'} width={'300px'} />
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
            {
              ' Enter your user account verified email address and we will send you a password reset link.'
            }
          </label>

          {errors.email && (
            <p style={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>

        <Button
          text="submit"
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
