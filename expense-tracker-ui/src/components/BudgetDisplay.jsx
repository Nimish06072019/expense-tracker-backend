import React from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';

const BudgetDisplay = ({ budget, totalSpent }) => {
  const budgetUsedPercent = budget > 0 ? (totalSpent / budget) * 100 : 0;
  const remaining = budget - totalSpent;
  const progressColor = budgetUsedPercent > 85 ? 'error' : budgetUsedPercent > 60 ? 'warning' : 'primary';

  return (
    <Paper
      elevation={4}
      sx={{
        p: 1.5,
        mx: { xs: 2, md: 4 }, // Add some horizontal margin
        mt: 2, // Margin-top to push it below the navbar
        background: 'rgba(30, 30, 30, 0.8)',
        backdropFilter: 'blur(5px)',
        border: '1px solid #333',
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" sx={{ color: '#ccc' }}>
          Monthly Budget
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
          {`$${totalSpent.toFixed(2)} / $${budget.toFixed(2)}`}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={budgetUsedPercent}
        color={progressColor}
        sx={{ height: 8, borderRadius: 5 }}
      />
      <Typography variant="caption" sx={{ color: remaining < 0 ? '#f44336' : '#aaa', mt: 0.5, display: 'block', textAlign: 'right' }}>
        {remaining >= 0 ? `$${remaining.toFixed(2)} Remaining` : `$${Math.abs(remaining).toFixed(2)} Over Budget`}
      </Typography>
    </Paper>
  );
};

export default BudgetDisplay;
