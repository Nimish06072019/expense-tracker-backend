import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const StatCard = ({ title, value, icon }) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 2,
        background: '#1e1e1e', // Matches our dark theme
        border: '1px solid #333',
        height: '100%',
      }}
    >
      <Box>
        <Typography sx={{ color: '#aaa' }}>{title}</Typography>
        <Typography component="p" variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ color: 'primary.main', opacity: 0.8 }}>
        {icon}
      </Box>
    </Paper>
  );
};

export default StatCard;
