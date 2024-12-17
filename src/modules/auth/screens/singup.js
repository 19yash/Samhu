import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { styles } from '../styles/singup.style';
import { ApiPaths } from '../../../constants/apiPaths';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/auth/AuthContext';
import httpService from '../../../services/httpService';
import images from '../../../images';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { setLoading, setAuth, state } = useContext(AuthContext);
  const [isHost, setIsHost] = useState(false);

  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setIsHost(e.target.value === 'host');
  };
  const onSubmit = async (data) => {
    console.log('Email:', data.email, 'Password:', data.password);
    setLoading(true);
    try {
      const response = await httpService.post(ApiPaths.singup, data);
      setLoading(false);
      navigate('/login');
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
      {/* Dummy Logo - This will always stay visible */}
      <div style={styles.logoContainer}>
        <img src={images.fullBrandLogo} alt="Logo" style={styles.logo} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <h2 style={styles.title}>Sign Up</h2>

        {/* Role Toggle */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Select Role</label>
          <select
            {...register('role')}
            onChange={handleRoleChange}
            style={styles.input}
          >
            <option value="participant">Participant</option>
            <option value="host">Host</option>
          </select>
        </div>

        {/* Name and Email */}
        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              style={styles.input}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p style={styles.errorMessage}>{errors.name.message}</p>
            )}
          </div>

          <div style={styles.fieldGroup}>
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
        </div>

        {/* Organization Name and Phone Number (for Host only) */}
        {isHost && (
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label htmlFor="organization" style={styles.label}>
                Organization Name
              </label>
              <input
                type="text"
                id="organization"
                {...register('organization_name', {
                  required: 'Organization name is required',
                })}
                style={styles.input}
                placeholder="Enter organization name"
              />
              {errors.organization && (
                <p style={styles.errorMessage}>{errors.organization.message}</p>
              )}
            </div>

            <div style={styles.fieldGroup}>
              <label htmlFor="phone" style={styles.label}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone_number', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be 10 digits',
                  },
                })}
                style={styles.input}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p style={styles.errorMessage}>{errors.phone.message}</p>
              )}
            </div>
          </div>
        )}
        {/* age */}
        {!isHost && (
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label htmlFor="address" style={styles.label}>
                Age
              </label>
              <input
                type="text"
                id="age"
                {...register('age', { required: 'Age is required' })}
                style={styles.input}
                placeholder="Enter Your Age"
              />
              {errors.address && (
                <p style={styles.errorMessage}>{errors.address.message}</p>
              )}
            </div>
            <div style={styles.fieldGroup}>
              <label htmlFor="address" style={styles.label}>
                Height
              </label>
              <input
                type="text"
                id="height"
                {...register('height')}
                style={styles.input}
                placeholder="Enter Your height"
              />
            </div>
            {/* <div style={styles.fieldGroup}>
              <label htmlFor="address" style={styles.label}>
                Weight
              </label>
              <input
                type="text"
                id="weight"
                {...register('weight')}
                style={styles.input}
                placeholder="Enter Your Weight"
              />
            </div> */}
          </div>
        )}

        {/* Address (for Host only) */}
        {
          <div style={styles.fieldGroup}>
            <label htmlFor="address" style={styles.label}>
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register('address', { required: 'Address is required' })}
              style={styles.input}
              placeholder="Enter address"
            />
            {errors.address && (
              <p style={styles.errorMessage}>{errors.address.message}</p>
            )}
          </div>
        }

        {/* Password */}
        <div style={styles.fieldGroup}>
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

        {/* Submit Button */}
        <div style={styles.fieldGroup}>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </div>
        <div style={styles.fieldGroup}>
          <button
            type="submit"
            style={styles.button}
            onClick={() => {
              navigate('/login');
            }}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
