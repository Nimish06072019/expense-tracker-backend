import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Paper, Box, Typography } from '@mui/material'; // <-- Typography is now imported

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ expenses = [] }) => { // Default to empty array for safety

  const chartData = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    return {
      labels,
      datasets: [
        {
          label: 'Expenses by Category',
          data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          borderColor: '#1e1e1e',
          borderWidth: 2,
        },
      ],
    };
  }, [expenses]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: 'white' } },
      title: { display: true, text: 'Category Breakdown', color: 'white', font: { size: 18 } },
    },
  };

  return (
    <Paper sx={{ p: 2, background: '#1e1e1e', borderRadius: 2 }}>
        {expenses.length > 0 ? (
            <Box sx={{ height: '300px' }}>
                <Doughnut data={chartData} options={options} />
            </Box>
        ) : (
            <Typography align="center" sx={{color: '#888', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                No data to display chart.
            </Typography>
        )}
    </Paper>
  );
};

export default CategoryPieChart;
