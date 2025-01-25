import React, { useState, useEffect } from 'react';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Autocomplete,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import httpService from '../../../services/httpService';
import { formStyles } from './style';
import Button from '../button/Button';

const GenericForm = ({
  mode,
  apiPath,
  layout,
  styles,
  onCancel,
  cancelButtonText = 'cancel',
  showCancelButton = true,
  saveButtonText = 'Save',
  defaultValues = {},
  beforeSubmit,
  afterSubmit,
  buttonContainerStyles = {},
  computations = [],
}) => {
  const [formLayout, setFormLayout] = useState(layout);
  const [formData, setFormData] = useState({ ...defaultValues });
  const [fileData, setFileData] = useState({});
  const [loading, setLoading] = useState(false);
  const [PageLoading, setPageLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [autocompleteOptions, setAutocompleteOptions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' && apiPath) {
      fetchFormData(apiPath);
    }
  }, [mode, apiPath]);

  const fetchFormData = async (apiPath) => {
    setLoading(true);
    try {
      const response = await httpService.get(apiPath);
      const formData = response.data;
      formLayout?.map(async (field) => {
        if (field.type === 'autocomplete') {
          await fetchAutocompleteOptions(field);
          formData[field.field] = {
            label: formData[field.field]['suggestionField'],
            value: formData[field.field]['keyField'],
          };
        }
      });
      doInititalComputations(formData);
      setFormData(response.data || {});
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const updateNestedObject = (obj, field, value) => {
    const keys = field.split('.');
    const newObj = { ...obj }; // Create a shallow copy of the object
    let currentObj = newObj;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        // Last key, set the value
        currentObj[key] = value;
      } else {
        // Intermediate key, ensure immutability and existence
        if (!currentObj[key] || typeof currentObj[key] !== 'object') {
          currentObj[key] = {};
        } else {
          currentObj[key] = { ...currentObj[key] };
        }
        currentObj = currentObj[key];
      }
    });

    return newObj;
  };

  const doInititalComputations = async (formData) => {
    if (computations.length) {
      for (const computation of computations) {
        // Check if the field triggers this computation
        const shouldCompute =
          !computation.condition || computation.condition(formData);
        if (shouldCompute) {
          try {
            // Call the compute function with the updated form data
            await computation.compute({
              formData: formData,
              setFormData,
              formLayout,
              setFormLayout,
            });
          } catch (error) {
            console.error(
              `Error during computation for field ${computation.field}:`,
              error
            );
          }
        }
      }
    }
  };
  const handleInputChange = async (field, value) => {
    // Update the nested field in formData
    const newFormData = updateNestedObject(formData, field, value);

    if (computations.length) {
      for (const computation of computations) {
        // Check if the field triggers this computation
        if (computation.fields.includes(field)) {
          const shouldCompute =
            !computation.condition || computation.condition(newFormData);

          if (shouldCompute) {
            try {
              // Call the compute function with the updated form data
              await computation.compute({
                formData: newFormData,
                setFormData,
                formLayout,
                setFormLayout,
              });
            } catch (error) {
              console.error(
                `Error during computation for field ${field}:`,
                error
              );
            }
          }
        }
      }
    }

    // Update the state with the new formData
    setFormData(newFormData);
  };
  const getNestedValue = (obj, path = '') => {
    return path.split('.').reduce((acc, key) => (acc ? acc[key] : ''), obj);
  };
  const handleFileChange = async (field, file, api) => {
    if (!file) return;
    const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif'];

    try {
      if (!acceptedFormats.includes(file.type)) {
        throw new Error('Invalid file format');
      }
      if (api) {
        const _formData = new FormData();
        _formData.append('media', file);

        const response = await httpService.post(api, _formData);

        if (response.url) {
          setFormData({ ...formData, [field]: response.url });
        } else {
          throw new Error('File upload failed Try again later');
        }
      }
      toast.success('File uploaded successfully');
    } catch (err) {
      console.log('🚀 ~ handleFileChange ~ err:', err);
      toast.error(err.message);
    }
  };

  const onSubmit = async (formData) => {
    console.log('🚀 ~ onSubmit ~ formData:', formData);
    setLoading(true);

    try {
      // Process formData before submission, if applicable
      const processedFormData = beforeSubmit
        ? await handleBeforeSubmit(formData)
        : formData;

      // Submit the processed formData
      const response = await submitFormData(processedFormData);

      // Handle the response after submission
      await handleAfterSubmit(response);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to process formData before submission
  const handleBeforeSubmit = async (formData) => {
    try {
      const response = await beforeSubmit(formData);
      if (response && typeof response === 'object') {
        return response;
      } else {
        throw new Error('Invalid data returned from beforeSubmit.');
      }
    } catch (error) {
      console.error('Error in beforeSubmit:', error);
      toast.error(
        error.message ||
          'Failed to process form data. Please check your inputs.'
      );
      // throw error; // Propagate error to be caught in onSubmit
    }
  };

  // Helper function to submit formData based on mode
  const submitFormData = async (formData) => {
    try {
      const response =
        mode === 'create'
          ? await httpService.post(apiPath, formData)
          : await httpService.put(apiPath, formData);

      if (response && response.message !== 'error') {
        toast.success('Successful');
        return response;
      } else {
        throw new Error('An error occurred during the operation.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      toast.error('An error occurred during the operation.');
      throw error; // Propagate error to be caught in onSubmit
    }
  };

  // Helper function to handle actions after form submission
  const handleAfterSubmit = async (response) => {
    if (afterSubmit) {
      try {
        await afterSubmit(response);
      } catch (error) {
        console.error('Error in afterSubmit:', error);
        // Optionally, display a toast or handle the error as needed
      }
    }
  };

  const handleSubmit = (e) => {
    console.log('called');
    e.preventDefault();
    console.log('called 2');

    const requiredErrors = {};
    formLayout?.forEach((section) => {
      section?.fields?.forEach((field) => {
        if (field.required && !formData[field.field]) {
          requiredErrors[field.field] = `${field.label} is required`;
        }
      });
    });
    console.log('setting Errors',requiredErrors);
    setErrors(requiredErrors);
    if (Object.keys(requiredErrors).length === 0) {
      console.log('no Errors');
      onSubmit({ ...formData, ...fileData });
    }
  };

  const fetchAutocompleteOptions = async (field) => {
    const { api, filter, suggestionField, keyField, field: fieldName } = field;
    try {
      if (autocompleteOptions[fieldName]?.length) return; // Skip if options are already loaded
      const response = await httpService.get(api, { params: filter });
      const options = response?.data?.map((item) => ({
        label: item[suggestionField],
        value: item[keyField],
      }));
      setAutocompleteOptions((prev) => ({
        ...prev,
        [fieldName]: options,
      }));
    } catch (error) {
      console.error('Error fetching autocomplete options:', error);
    }
  };

  const renderField = (field) => {
    const {
      type,
      label,
      field: fieldName,
      required,
      size = 'medium',
      visible,
      options,
      api,
      allowedFormats,
      readOnly,
      value,
    } = field;

    // Visibility logic
    if (visible && typeof visible === 'function' && !visible(formData)) {
      return null;
    }

    // Size logic
    const sizeMapping = {
      small: 4,
      medium: 6,
      large: 12,
    };
    const gridSize = sizeMapping[size] || 6;
    // Field rendering
    switch (type) {
      case 'text':
        return (
          <Grid item xs={gridSize} key={fieldName}>
            <TextField
              fullWidth
              type={type}
              // label={label}
              placeholder={label}
              value={value || getNestedValue(formData, fieldName) || ''}
              required={required}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              error={!!errors[fieldName]}
              helperText={errors[fieldName]}
              sx={formStyles.input}
              InputProps={{
                readOnly: readOnly, // Makes the field read-only
              }}
            />
          </Grid>
        );
      case 'number':
        return (
          <Grid item xs={gridSize} key={fieldName}>
            <TextField
              fullWidth
              type={type}
              // label={label}
              placeholder={label}
              value={value || getNestedValue(formData, fieldName) || ''}
              required={required}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              error={!!errors[fieldName]}
              helperText={errors[fieldName]}
              sx={formStyles.input}
              InputProps={{
                readOnly: readOnly, // Makes the field read-only
              }}
            />
          </Grid>
        );
      case 'date':
        return (
          <Grid item xs={gridSize} key={fieldName}>
            <TextField
              fullWidth
              type={type}
              label={label}
              // placeholder={label}
              value={getNestedValue(formData, fieldName) || ''}
              required={required}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              error={!!errors[fieldName]}
              helperText={errors[fieldName]}
              InputLabelProps={{ shrink: true }}
              sx={formStyles.input}
              InputProps={{
                readOnly: readOnly, // Makes the field read-only
              }}
            />
          </Grid>
        );

      case 'file':
        return (
          <Grid item xs={gridSize} key={fieldName}>
            <TextField
              fullWidth
              type="file"
              label={label}
              required={required}
              onChange={(e) =>
                handleFileChange(fieldName, e.target.files[0], api)
              }
              error={!!errors[fieldName]}
              helperText={errors[fieldName]}
              InputLabelProps={{ shrink: true }}
              accept={allowedFormats} // Allowed formats
              sx={formStyles.input}
              InputProps={{
                readOnly: readOnly, // Makes the field read-only
              }}
            />
          </Grid>
        );

      case 'checkbox':
        return (
          <Grid item xs={gridSize} key={fieldName}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!getNestedValue(formData, fieldName)}
                  onChange={(e) =>
                    handleInputChange(fieldName, e.target.checked)
                  }
                />
              }
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #ccc', // Border to make it look like an input
                    color: '#000',
                    fontSize: '12px',
                    borderWidth: '1px',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    minHeight: '48px',
                    justifyContent: 'center',
                    backgroundColor: 'rgb(252, 252, 252)',
                    borderColor: 'rgb(238, 238, 237)',
                    flexGrow: '1',
                  }}
                >
                  {label}
                </Box>
              }
              sx={{
                display: 'flex',
                alignItems: 'center', // Vertically center the checkbox and label
                justifyContent: 'space-between', // Space between checkbox and label
                '.MuiFormControlLabel-label': {
                  flexGrow: '1',
                  display: 'flex',
                },
              }}
            />
          </Grid>
        );

      case 'radio':
        return (
          <Grid item xs={gridSize} key={fieldName}>
            <RadioGroup
              value={getNestedValue(formData, fieldName) || ''}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
            >
              {options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </Grid>
        );

      case 'autocomplete':
        const fieldOptions = autocompleteOptions[fieldName] || options || [];
        let _value = null;
        if (fieldOptions.length) {
          _value = fieldOptions.find(
            (opt) => opt.value === formData[fieldName]
          );
        } else if (formData[fieldName]) {
          _value = {
            label: formData[fieldName]?.[field?.suggestionField],
            value: formData[fieldName]?.[field?.keyField],
          };
        }
        return (
          <Grid item xs={gridSize} key={fieldName}>
            <Autocomplete
              options={fieldOptions}
              getOptionLabel={(option) => option.label}
              value={_value}
              onFocus={() => {
                if (!autocompleteOptions[fieldName]) {
                  fetchAutocompleteOptions(field);
                }
              }}
              onChange={(_, selected) =>
                handleInputChange(fieldName, selected?.value || '')
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={label}
                  required={required}
                  error={!!errors[fieldName]}
                  helperText={errors[fieldName]}
                  sx={formStyles.input}
                />
              )}
            />
          </Grid>
        );
      case 'password':
        return (
          <Grid item xs={gridSize} key={fieldName}>
            <TextField
              fullWidth
              type="password"
              placeholder={label}
              value={getNestedValue(formData, fieldName) || ''}
              required={required}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              error={!!errors[fieldName]}
              helperText={errors[fieldName]}
              sx={formStyles.input}
              InputProps={{
                readOnly: readOnly, // Makes the field read-only
              }}
            />
          </Grid>
        );
      default:
        return null;
    }
  };
  const cancelHandler = () => {
    if (onCancel) {
      setFormData({});
      onCancel();
    } else {
      setFormData({});
      navigate(-1);
    }
  };
  return (
    <Box component="form" sx={{ ...styles }}>
      <Grid container spacing={2}>
        {formLayout?.map((section, sectionIndex) => (
          <Grid item xs={12} key={`section-${sectionIndex}`}>
            {section.label && (
              <Typography variant="h6" color="primary" gutterBottom>
                {section.label}
              </Typography>
            )}
            <Grid container spacing={2}>
              {section?.fields?.map((field) => renderField(field))}
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Box
        mt={3}
        display="flex"
        justifyContent="flex-end"
        gap={2}
        {...buttonContainerStyles}
      >
        {showCancelButton && (
          <Button text={cancelButtonText} onClick={cancelHandler} />
        )}
        <Button
          text={saveButtonText}
          onClick={(e) => {
            handleSubmit(e);
          }}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

GenericForm.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit']),
  apiPath: PropTypes.string,
  layout: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      fields: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          field: PropTypes.string.isRequired,
          required: PropTypes.bool | PropTypes.func,
          visible: PropTypes.func,
          size: PropTypes.oneOf(['small', 'medium', 'large']),
          options: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.any,
            })
          ),
          api: PropTypes.string,
          filter: PropTypes.object,
          suggestionField: PropTypes.string,
          keyField: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
  // onSubmit: PropTypes.func.isRequired,`
  styles: PropTypes.object,
};

export default GenericForm;
