import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper
} from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { toast } from 'react-toastify';

import { getAllExpenses } from '../services/ExpenseService';
import StatCard from '../components/StatCard';
import CategoryPieChart from '../components/CategoryPieChart';
import MonthlyBarChart from '../components/MonthlyBarChart';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import BudgetSetter from '../components/BudgetSetter';
import BudgetDisplay from '../components/BudgetDisplay';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState(() => {
    const stored = localStorage.getItem('monthlyBudget');
    return stored !== null && !isNaN(parseFloat(stored)) ? parseFloat(stored) : null;
  });

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const response = await getAllExpenses();
        setExpenses(response.data);
      } catch (error) {
        toast.error('Failed to load expenses');
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleSetBudget = (newBudget) => {
    localStorage.setItem('monthlyBudget', newBudget);
    setBudget(parseFloat(newBudget));  // <-- IMPORTANT
    setBudgetDialogOpen(false);  // <-- closes the dialog

    window.location.reload();
  };

  const handleFormSubmit = () => {
    setAddDialogOpen(false);
    setUpdateDialogOpen(false);
    setExpenseToUpdate(null);

    window.location.reload();
  };

  const handleOpenUpdateDialog = (expense) => {
    setExpenseToUpdate(expense);
    setUpdateDialogOpen(true);
  };

  const handleExpenseDeleted = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const { totalSpent, topCategory } = useMemo(() => {
    if (!Array.isArray(expenses) || expenses.length === 0)
      return { totalSpent: 0, topCategory: '-' };

    const total = expenses.reduce((acc, e) => acc + e.amount, 0);
    const catSum = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
    const top = Object.keys(catSum).reduce((a, b) =>
      catSum[a] > catSum[b] ? a : b, '-'
    );

    return { totalSpent: total, topCategory: top };
  }, [expenses]);

  const budgetRemaining = (budget ?? 0) - totalSpent;

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <CircularProgress />
    </Box>;
  }

  return (
    <>
      {budget !== null && (
        <BudgetDisplay budget={budget} totalSpent={totalSpent} />
      )}

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>Dashboard</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            {budget === null ? (
              <Button variant="contained" onClick={() => setBudgetDialogOpen(true)}>
                Set Your Budget
              </Button>
            ) : (
              <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setBudgetDialogOpen(true)}>
                Update Budget
              </Button>
            )}
            <Button variant="contained" startIcon={<AddCardIcon />} onClick={() => setAddDialogOpen(true)}>
              Add Expense
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <StatCard
                  title="Total Spent"
                  value={`$${totalSpent.toFixed(2)}`}
                  icon={<AttachMoneyIcon fontSize="large" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <StatCard
                  title="Top Category"
                  value={topCategory}
                  icon={<TrendingUpIcon fontSize="large" />}
                />
              </Grid>
              {budget !== null && (
                <Grid item xs={12} sm={4}>
                  <StatCard
                    title="Budget Remaining"
                    value={`$${budgetRemaining.toFixed(2)}`}
                    icon={<AccountBalanceWalletIcon fontSize="large" />}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <MonthlyBarChart expenses={expenses} />
              </Grid>
              <Grid item xs={12}>
                <CategoryPieChart expenses={expenses} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 2, background: '#1e1e1e', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Recent Transactions
              </Typography>
              <ExpenseList
                expenses={expenses}
                onExpenseDeleted={handleExpenseDeleted}
                onEdit={handleOpenUpdateDialog}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Add Expense Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} PaperProps={{ sx: { backgroundColor: '#1e1e1e' } }}>
        <DialogTitle sx={{ color: 'white' }}>Add Expense</DialogTitle>
        <DialogContent>
          <ExpenseForm onFormSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>

      {/* Update Expense Dialog */}
      <Dialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)} PaperProps={{ sx: { backgroundColor: '#1e1e1e' } }}>
        <DialogTitle sx={{ color: 'white' }}>Update Expense</DialogTitle>
        <DialogContent>
          <ExpenseForm onFormSubmit={handleFormSubmit} initialData={expenseToUpdate} />
        </DialogContent>
      </Dialog>

      {/* Set/Update Budget Modal */}
      <Dialog open={budgetDialogOpen} onClose={() => setBudgetDialogOpen(false)} PaperProps={{ sx: { backgroundColor: '#1e1e1e' } }}>
        <DialogTitle sx={{ color: 'white' }}>
          {budget === null ? 'Set Your Budget' : 'Update Budget'}
        </DialogTitle>
        <DialogContent>
          <BudgetSetter onBudgetSet={handleSetBudget} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dashboard;
