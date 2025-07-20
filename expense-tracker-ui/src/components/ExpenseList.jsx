import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteExpense } from '../services/ExpenseService';
import { toast } from 'react-toastify';

const ExpenseList = ({ expenses, onExpenseDeleted, onEdit }) => {
  const handleDelete = async (id) => {
    // We can show a confirmation dialog here in a real app
    const originalExpenses = [...expenses];
    onExpenseDeleted(id); // Optimistic UI update
    try {
      await deleteExpense(id);
      toast.success("Expense deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete expense.");
      // Ideally, roll back the state here
    }
  };

  return (
    <TableContainer component={Paper} sx={{ background: '#1e1e1e', borderRadius: 2, maxHeight: 440 }}>
      <Table stickyHeader aria-label="expense list">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', background: '#1e1e1e' }}>Title</TableCell>
            <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold', background: '#1e1e1e' }}>Amount</TableCell>
            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', background: '#1e1e1e' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ color: '#888', py: 4, border: 0 }}>
                No expenses yet. Click "Add Expense" to get started!
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ color: 'white' }}>{expense.title}</TableCell>
                <TableCell align="right" sx={{ color: '#4caf50', fontWeight: 'bold' }}>{`$${expense.amount.toFixed(2)}`}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => onEdit(expense)} sx={{ color: '#64b5f6' }} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(expense.id)} sx={{ color: '#f44336' }} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;
