import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`users-tabpanel-${index}`}
      aria-labelledby={`users-tab-${index}`}
      style={{ height: '100%', display: value === index ? 'block' : 'none', overflow: 'hidden' }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default TabPanel;

