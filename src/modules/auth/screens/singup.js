import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { styles } from '../styles/singup.style';
import { useNavigate } from 'react-router-dom';
import httpService from '../../../services/httpService';
import images from '../../../images';
import routeLink from '../../../constants/routeLink';
import { toast } from 'react-toastify';
import Button from '../../components/button/Button';
import GenericForm from '../../components/form/Form';
import { modes } from '../../../constants/formConstants';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [isHost, setIsHost] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setIsHost(e.target.value === 'host');
  };

  const onSubmit = async (data) => {
    data.age = Number(data.age); // Convert to number
    data.height = Number(data.height); // Convert to number
    setLoading(true);
    try {
      const response = await httpService.post(routeLink.signup, data);
      if (response?.message === 'success') {
        toast.success('User cretaed successfully');
        setLoading(false);
        navigate('/login');
      }
      setLoading(false);
      return { message: 'success' };
    } catch (error) {
      console.error('Error logging in:', error);
      setError('identifier', {
        type: 'manual',
        message: 'Invalid credentials',
      });
      setLoading(false);
    }
  };
  const layoutFields = [
    {
      fields: [
        {
          label: 'Role',
          type: 'autocomplete',
          field: 'role',
          required: true,
          size: 'large',
          options: [
            { label: 'Host', value: 'Host' },
            { label: 'Participant', value: 'Participant' },
          ],
        },
        {
          label: 'Name',
          type: 'text',
          field: 'name',
          required: true,
          size: 'medium',
        },
        {
          label: 'Email',
          type: 'text',
          field: 'email',
          required: true,
          size: 'medium',
        },

        {
          label: 'Organization Name',
          type: 'text',
          field: 'organization_name',
          required: true,
          size: 'medium',
          visible: (data) => {
            return data.role === 'Host';
          },
        },
        {
          label: 'Academic Institute Name',
          type: 'text',
          field: 'organization_name',
          size: 'medium',
          visible: (data) => {
            return data.role === 'Participant';
          },
        },

        {
          label: 'Phone Number',
          type: 'text',
          field: 'phone_number',
          required: true,
          size: 'medium',
        },
        {
          label: 'Age',
          type: 'text',
          field: 'age',
          required: true,
          size: 'medium',
        },
        {
          label: 'Height',
          type: 'text',
          field: 'height',
          required: true,
          size: 'medium',
        },
        {
          label: 'Address',
          type: 'text',
          field: 'address',
          required: true,
          size: 'medium',
        },
        {
          label: 'Password',
          type: 'password',
          field: 'password',
          required: true,
          size: 'large',
        },
        {
          label: 'Confirm Password',
          type: 'password',
          field: 'confirm_password',
          required: true,
          size: 'large',
        },
      ],
    },
  ];
  return (
    <>
      <div style={styles.container}>
        {/* Dummy Logo - This will always stay visible */}
        <div style={styles.logoContainer}>
          <img src={images.fullBrandLogo} alt="Logo" style={styles.logo} />
        </div>
        {/* <form style={styles.form}>
          <h2 style={styles.title}>Sign Up</h2>

          {/* Role Toggle */}
        {/* <div style={styles.formGroup}>
            <label style={styles.label}>Select Role</label>
            <select
              {...register('role')}
              onChange={handleRoleChange}
              style={styles.input}
            >
              <option value="Host">Host</option>
              <option value="Participant">Participant</option>
            </select>
          </div>

          {/* Name and Email */}
        {/* <div style={styles.row}>
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
          </div> */}
        {/* Organization Name and Phone Number (for Host only) */}
        {/* {isHost && (
            <div style={styles.row}>
              <div style={styles.fieldGroup}>
                <label htmlFor="organization" style={styles.label}>
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organization"
                  {...register('organisation_name', {
                    required: 'Organization name is required',
                  })}
                  style={styles.input}
                  placeholder="Enter organization name"
                />
                {errors.organization && (
                  <p style={styles.errorMessage}>
                    {errors.organization.message}
                  </p>
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
          )} */}
        {/* age */}
        {/* {!isHost && (
            <div style={styles.row}>
              <div style={styles.fieldGroup}>
                <label htmlFor="age" style={styles.label}>
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  {...register('age', { required: 'Age is required' })}
                  style={styles.input}
                  placeholder="Enter Your Age"
                />
                {errors.age && (
                  <p style={styles.errorMessage}>{errors.age.message}</p>
                )}
              </div>
              <div style={styles.fieldGroup}>
                <label htmlFor="height" style={styles.label}>
                  Height
                </label>
                <input
                  type="text"
                  id="height"
                  {...register('height')}
                  style={styles.input}
                  placeholder="Enter Your height"
                />
              </div> */}
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
        {/* </div>
          )} */}
        {/* Address (for Host only) */}
        {
          // <div style={styles.fieldGroup}>
          //   <label htmlFor="address" style={styles.label}>
          //     Address
          //   </label>
          //   <input
          //     type="text"
          //     id="address"
          //     {...register('address', { required: 'Address is required' })}
          //     style={styles.input}
          //     placeholder="Enter address"
          //   />
          //   {errors.address && (
          //     <p style={styles.errorMessage}>{errors.address.message}</p>
          //   )}
          // </div>
        }
        {/* Password */}
        {/* <div style={styles.fieldGroup}>
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
          </div> */}
        {/* Submit Button */}
        {/* <div style={{ display: 'flex', width: '100%' }}>
          <Button
            text={'Submit'}
            loading={loading}
            onClick={handleSubmit(onSubmit)}
            style={{ flex: 1 }}
          />
        </div>
        <div style={{ display: 'flex', width: '100%' }}>
          <Button
            text={'Log In'}
            onClick={() => {
              navigate('/login');
            }}
            style={{ flex: 1 }}
          />
        </div> */}
        {/* </form>  */}
        <div style={styles.form}>
          <GenericForm
            mode={modes.create}
            apiPath={routeLink.signup}
            layout={layoutFields}
            buttonContainerStyles={{
              flexDirection: 'column-reverse', // Ensure buttons stack vertically

              gap: 2, // Gap between buttons
              width: '100%', // Make the buttons container take full width
              alignItems: 'stretch',
            }}
            // showCancelButton={false}
            saveButtonText={'Submit'}
            cancelButtonText="Log In"
            onCancel={() => navigate('/login')}
          />
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
