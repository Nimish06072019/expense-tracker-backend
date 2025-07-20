import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Your Expense Tracker! 💸
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Take control of your finances. Track, save, and succeed.
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <Button variant="contained" color="primary" size="large" sx={{ mr: 2 }} onClick={() => navigate('/login')}>
                        Login
                    </Button>
                    <Button variant="outlined" color="primary" size="large" onClick={() => navigate('/register')}>
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Landing; // <--- The key is `export default`!
