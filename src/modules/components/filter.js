// import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import httpService from '../../services/httpService';
import { formStyles } from './form/style';

const GenericFilter = ({
  filterKey,
  setFilterValues,
  label,
  required = false,
  error = '',
  helperText = '',
  //   formStyles = {},
  api,
  apiFilter,
  suggestionField,
  keyField,
  value,
  setValue,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch options from API
  const fetchOptions = async () => {
    if (!loading && options.length === 0) {
      setLoading(true);
      try {
        const response = await httpService.get(api, apiFilter);
        let options = [];
        if (response.data) {
          options = response.data.map((data) => {
            return { label: data[suggestionField], value: data[keyField] };
          });
        }
        setOptions(options || []);
      } catch (err) {
        console.error('Error fetching options:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle selection change
  const handleChange = (_, selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : '';
    setValue(selectedOption);
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      [filterKey]: selectedValue,
    }));
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label || ''}
      value={value}
      onFocus={fetchOptions}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.value === value?.value}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={label}
          required={required}
          error={!!error}
          helperText={helperText || error}
          sx={formStyles.input}
        />
      )}
    />
  );
};

GenericFilter.propTypes = {
  apiCall: PropTypes.func.isRequired, // Function to fetch options from API
  filterKey: PropTypes.string.isRequired, // Key for the filter to update
  setFilter: PropTypes.func.isRequired, // Function to update the filter state
  label: PropTypes.string.isRequired, // Placeholder/label text for the field
  required: PropTypes.bool, // Whether the field is required
  error: PropTypes.string, // Error message for the field
  helperText: PropTypes.string, // Helper text for the field
  formStyles: PropTypes.object, // Custom styles for the field
};

export default GenericFilter;
