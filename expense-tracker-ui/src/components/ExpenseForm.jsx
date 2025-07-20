import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { addExpense, updateExpense } from '../services/ExpenseService';
import { toast } from 'react-toastify';

/**
 * A smart form for both adding and updating expenses.
 * @param {function} onFormSubmit - A callback function to run after submission (to close the modal).
 * @param {object} [initialData] - Optional. If provided, the form will be in "update" mode and pre-filled with this data.
 */
const ExpenseForm = ({ onFormSubmit, initialData }) => {
  const [formData, setFormData] = useState({ title: '', category: '', amount: '', date: '' });

  // This powerful effect runs whenever `initialData` changes.
  // It's the key to switching between "add" and "update" modes.
  useEffect(() => {
    if (initialData) {
      // If we have initialData, we're in "update" mode. Pre-fill the form.
      setFormData({
        title: initialData.title || '',
        category: initialData.category || '',
        amount: initialData.amount || '',
        date: initialData.date ? initialData.date.split('T')[0] : '', // Format date correctly (YYYY-MM-DD)
      });
    } else {
      // If no initialData, we're in "add" mode. Ensure the form is empty.
      setFormData({ title: '', category: '', amount: '', date: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.amount || !formData.date) {
        toast.warn("Please fill out all fields.");
        return;
    }

    try {
      if (initialData) {
        // If we are in "update" mode, call the update service function.
        await updateExpense(initialData.id, { ...formData, amount: parseFloat(formData.amount) });
        toast.success("Expense updated successfully!");
      } else {
        // Otherwise, we are in "add" mode. Call the add service function.
        await addExpense({ ...formData, amount: parseFloat(formData.amount) });
        toast.success("Expense added successfully!");
      }
      onFormSubmit(); // Notify the parent component that the submission is done.
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  // Centralized styles for TextFields to match your app's dark theme
  const textFieldStyles = {
    '& .MuiInputBase-root': { color: '#e0e0e0' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#555' },
      '&:hover fieldset': { borderColor: '#00BFFF' },
      '&.Mui-focused fieldset': { borderColor: '#00BFFF' },
    },
    '& label': { color: '#888' },
    '& label.Mui-focused': { color: '#00BFFF' },
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ minWidth: { xs: 'auto', sm: 400 }, pt: 1 }}>
      <TextField name="title" label="Title" value={formData.title} onChange={handleChange} fullWidth margin="normal" variant="outlined" sx={textFieldStyles}/>
      <TextField name="category" label="Category" value={formData.category} onChange={handleChange} fullWidth margin="normal" variant="outlined" sx={textFieldStyles}/>
      <TextField name="amount" label="Amount" type="number" value={formData.amount} onChange={handleChange} fullWidth margin="normal" variant="outlined" sx={textFieldStyles}/>
      <TextField name="date" label="Date" type="date" value={formData.date} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} sx={textFieldStyles}/>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, py: 1.5, background: '#00BFFF', '&:hover': { background: '#009ACD' } }}>
        {/* The button text dynamically changes based on the mode! */}
        {initialData ? 'Save Changes' : 'Add Expense'}
      </Button>
    </Box>
  );
};

export default ExpenseForm;
