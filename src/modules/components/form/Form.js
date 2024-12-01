import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Autocomplete,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { Save, Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import httpService from '../../../services/httpService';

const GenericForm = ({ mode, apiPath, layout, styles }) => {
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState({});
  const [loading, setLoading] = useState(false);
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
      const response = await axios.get(apiPath);
      setFormData(response.data || {});
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (field, file) => {
    setFileData({ ...fileData, [field]: file });
  };

  const onSubmit = async (formData) => {
    try {
      if (mode === 'create') {
        await httpService.post(apiPath, {
          body: formData,
        });
      } else {
        await httpService.put(apiPath, {
          body: formData,
        });
      }
      toast.success('Successfull');
    } catch (err) {
      console.log(err);
      toast.error('Something Went wrong');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredErrors = {};
    layout?.forEach((section) => {
      section?.fields?.forEach((field) => {
        if (field.required && !formData[field.field]) {
          requiredErrors[field.field] = `${field.label} is required`;
        }
      });
    });

    setErrors(requiredErrors);
    if (Object.keys(requiredErrors).length === 0) {
      onSubmit({ ...formData, ...fileData });
    }
  };

  const fetchAutocompleteOptions = async (field) => {
    const { api, filter, suggestionField, keyField } = field;
    try {
      console.log('geting options');
      const response = await httpService.get(api, { params: filter });
      const options = response.data.map((item) => ({
        label: item[suggestionField],
        value: item[keyField],
      }));
      setAutocompleteOptions((prev) => ({
        ...prev,
        [field.field]: options,
      }));
    } catch (error) {
      console.error('Error fetching autocomplete options:', error);
    }
  };

  useEffect(() => {
    layout.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === 'autocomplete' && field.api) {
          fetchAutocompleteOptions(field);
        }
      });
    });
  }, [layout]);

  const renderField = (field) => {
    const {
      type,
      label,
      field: fieldName,
      required,
      size = 'medium',
      visible,
      options,
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
              value={formData[fieldName] || ''}
              required={required}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              error={!!errors[fieldName]}
              helperText={errors[fieldName]}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#000',
                  fontFamily: 'Inter, Arial, sans-serif',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  fontSize: '12px',
                  padding: '2px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2e2e2e',
                    borderWidth: '1px',
                    borderRadius: '12px',
                  },
                },
                '& .MuiInputLabel-outlined': {
                  color: '#2e2e2e',
                  fontWeight: 'bold',
                },
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
              value={formData[fieldName] || ''}
              required={required}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              error={!!errors[fieldName]}
              helperText={errors[fieldName]}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#000',
                  fontFamily: 'Inter, Arial, sans-serif',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  fontSize: '12px',
                  padding: '2px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2e2e2e',
                    borderWidth: '1px',
                    borderRadius: '12px',
                  },
                },
                '& .MuiInputLabel-outlined': {
                  color: '#2e2e2e',
                  fontWeight: 'bold',
                },
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
              value={formData[fieldName] || ''}
              required={required}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              error={!!errors[fieldName]}
              helperText={errors[fieldName]}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#000',
                  fontFamily: 'Inter, Arial, sans-serif',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  fontSize: '12px',
                  padding: '2px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2e2e2e',
                    borderWidth: '1px',
                    borderRadius: '12px',
                  },
                },
                '& .MuiInputLabel-outlined': {
                  color: '#2e2e2e',
                  fontWeight: 'bold',
                },
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
              onChange={(e) => handleFileChange(fieldName, e.target.files[0])}
              error={!!errors[fieldName]}
              helperText={errors[fieldName]}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#000',
                  fontFamily: 'Inter, Arial, sans-serif',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  fontSize: '12px',
                  padding: '2px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2e2e2e',
                    borderWidth: '1px',
                    borderRadius: '12px',
                  },
                },
                '& .MuiInputLabel-outlined': {
                  color: '#2e2e2e',
                  fontWeight: 'bold',
                },
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
                  checked={!!formData[fieldName]}
                  onChange={(e) =>
                    handleInputChange(fieldName, e.target.checked)
                  }
                />
              }
              label={label}
            />
          </Grid>
        );

      case 'radio':
        return (
          <Grid item xs={gridSize} key={fieldName}>
            <RadioGroup
              value={formData[fieldName] || ''}
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
        return (
          <Grid item xs={gridSize} key={fieldName}>
            <Autocomplete
              options={fieldOptions}
              getOptionLabel={(option) => option.label}
              value={
                fieldOptions.find((opt) => opt.value === formData[fieldName]) ||
                null
              }
              onChange={(_, selected) =>
                handleInputChange(fieldName, selected?.value || '')
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  required={required}
                  error={!!errors[fieldName]}
                  helperText={errors[fieldName]}
                  backgroundColor="#fff"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#000',
                      fontFamily: 'Inter, Arial, sans-serif',
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      fontSize: '12px',
                      padding: '2px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#2e2e2e',
                        borderWidth: '1px',
                        borderRadius: '12px',
                      },
                    },
                    '& .MuiInputLabel-outlined': {
                      color: '#2e2e2e',
                      fontWeight: 'bold',
                    },
                  }}
                />
              )}
            />
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ ...styles }}>
      <Grid container spacing={2}>
        {layout?.map((section, sectionIndex) => (
          <Grid item xs={12} key={`section-${sectionIndex}`}>
            {section.label && (
              <Typography variant="h6" color="primary" gutterBottom>
                {section.label}
              </Typography>
            )}
            <Grid container spacing={2}>
              {section.fields.map((field) => renderField(field))}
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="outlined"
          startIcon={<Close />}
          onClick={() => {
            setFormData({});
            navigate(-1);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          type="submit"
        >
          Save
        </Button>
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
          required: PropTypes.bool,
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
