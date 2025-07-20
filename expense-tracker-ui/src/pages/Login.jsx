import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Authenticating...");
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form);
      localStorage.setItem('jwt', res.data.jwt);
      toast.update(loadingToast, { render: "Access Granted", type: "success", isLoading: false, autoClose: 2000 });
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      toast.update(loadingToast, { render: "Authentication Failed", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const textFieldStyles = {
    '& .MuiInputBase-root': { color: '#e0e0e0' },
    '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#00BFFF' }, '&.Mui-focused fieldset': { borderColor: '#00BFFF' } },
    '& label': { color: '#888' }, '& label.Mui-focused': { color: '#00BFFF' },
  };

  return (
    // This Box no longer needs its own background, it inherits from App.js!
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)' }}>
      <Container component="main" maxWidth="xs">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Paper elevation={24} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3, background: '#1e1e1e', border: '1px solid #333', boxShadow: '0 0 25px rgba(0, 191, 255, 0.2)' }}>
            <Typography component="h1" variant="h4" sx={{ mb: 3, color: '#fff', fontWeight: 'bold' }}>Secure Login</Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
              <TextField label="Username" name="username" fullWidth margin="normal" required autoFocus sx={textFieldStyles} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              <TextField label="Password" name="password" type="password" fullWidth margin="normal" required sx={textFieldStyles} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5, background: '#00BFFF', '&:hover': { background: '#009ACD' } }}>Sign In</Button>
              <Box textAlign="center">
                <Link to="/register" style={{ textDecoration: 'none', color: '#00BFFF' }}>Need an account?</Link>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;
