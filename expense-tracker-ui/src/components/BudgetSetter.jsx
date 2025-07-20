import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const BudgetSetter = ({ onBudgetSet }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBudget = parseFloat(inputValue);

    if (!isNaN(newBudget) && newBudget > 0) {
      onBudgetSet(newBudget); // ✅ This calls the parent method
      toast.success(`Budget set to $${newBudget.toFixed(2)}`);
      setInputValue(''); // Reset input
    } else {
      toast.error("Please enter a valid, positive number.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, pt: 1 }}>
      <TextField
        label="Monthly Budget Amount"
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        sx={{ '& .MuiInputBase-root': { color: '#e0e0e0' } }}
        autoFocus
      />
      <Button type="submit" variant="contained" sx={{ background: '#00BFFF' }}>
        Set
      </Button>
    </Box>
  );
};

export default BudgetSetter;
