import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Paper, Box, Typography } from '@mui/material';

// We must register the components we're using from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// The component now accepts the live `expenses` array as a prop
const MonthlyBarChart = ({ expenses = [] }) => { // Default to empty array for safety

  // --- This is the new, intelligent data processing logic ---
  const chartData = useMemo(() => {
    // 1. Group expenses by month and sum their amounts
    const monthlyTotals = expenses.reduce((acc, expense) => {
      // Create a key like "2025-07" for grouping
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      acc[monthKey] = (acc[monthKey] || 0) + expense.amount;
      return acc;
    }, {});

    // 2. Sort the months chronologically
    const sortedMonths = Object.keys(monthlyTotals).sort();

    // 3. Create user-friendly labels (e.g., "Jul 2025")
    const labels = sortedMonths.map(monthKey => {
      const [year, month] = monthKey.split('-');
      const date = new Date(year, month - 1);
      return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    });

    // 4. Get the corresponding data points
    const data = sortedMonths.map(monthKey => monthlyTotals[monthKey]);

    // 5. Return the final object in the format Chart.js expects
    return {
      labels,
      datasets: [
        {
          label: 'Total Expenses',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  }, [expenses]); // This logic only re-runs when the expenses array changes

  // Chart.js options for styling and configuration (no changes needed here)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: 'white' } },
      title: { display: true, text: 'Monthly Spending Breakdown', color: 'white', font: { size: 18, weight: 'bold' } },
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
      y: { ticks: { color: 'white' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }
    }
  };

  return (
    <Paper sx={{ p: 2, background: '#1e1e1e', borderRadius: 2, border: '1px solid #333' }}>
      {/* Handle the empty state gracefully */}
      {expenses.length > 0 ? (
        <Box sx={{ height: { xs: 300, md: 350 } }}>
          <Bar options={options} data={chartData} />
        </Box>
      ) : (
        <Box sx={{ height: { xs: 300, md: 350 }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ color: '#888' }}>
            Add some expenses to see your monthly trends.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default MonthlyBarChart;
