import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = memo(({ value, onChange, placeholder = 'Search users...' }) => {
  const handleChange = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        marginBottom: { xs: 2, sm: 2.5, md: 3 },
      }}
    />
  );
});

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInput.displayName = 'SearchInput';

export default SearchInput;

